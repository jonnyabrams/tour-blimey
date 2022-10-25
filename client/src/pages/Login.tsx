import { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state: any) => state.auth);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // only runs when there's an error, as per dependency array
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // can only log in if email & password are both present
    if (email && password) {
      // @ts-ignore
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                label="Email"
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Log In
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account? Sign up here!</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
