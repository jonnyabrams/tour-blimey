import { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getToursByUser } from "../redux/features/tourSlice";
import { TourType } from "../../typings/typings";
import { excerpt } from "../helpers";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { userTours, loading } = useAppSelector((state) => state.tour);
  const userId = user?.user._id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ margin: "auto", padding: "120px", alignContent: "center" }}>
      <h4 className="text-center">Dashboard: {user?.user?.name}</h4>
      <hr style={{ maxWidth: "570px" }} />
      {userTours &&
        userTours.map((item: TourType, index: number) => (
          <MDBCardGroup style={{ maxWidth: "600px" }} key={index}>
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded"
                  src={item.imageFile}
                  alt={item.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {excerpt(item.description)}
                    </small>
                  </MDBCardText>
                  <div
                    style={{
                      marginLeft: "5px",
                      float: "right",
                      marginTop: "-60px",
                    }}
                  >
                    <MDBBtn className="mt-1" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                      />
                    </MDBBtn>
                    <Link to={`/edit-tour/${item._id}`}>
                      <MDBIcon
                        fas
                        icon="edit"
                        style={{ color: "#55acee", marginLeft: "10px" }}
                        size="lg"
                      />
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
