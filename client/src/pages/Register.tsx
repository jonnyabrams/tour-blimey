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
import { toast } from "react-toastify";

import { register } from "../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

// import { login } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useAppSelector((state) => state.auth);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // only runs when there's an error, as per dependency array
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (firstName && lastName && email && password && confirmPassword) {
      // @ts-ignore
      dispatch(register({ formValue, navigate, toast }));
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                label="First name"
                placeholder="First name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                label="Last name"
                placeholder="Last name"
                type="test"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
              />
            </div>
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
            <div className="col-md-12">
              <MDBInput
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
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
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account? Log in here!</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
