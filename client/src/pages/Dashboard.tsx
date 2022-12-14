import { useEffect } from "react";
import {
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

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import { TourType } from "../../typings/typings";
import { excerpt } from "../utils/helpers";
import Spinner from "../components/Spinner";
import { ObjectId } from "mongoose";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { userTours, loading } = useAppSelector((state) => state.tour);
  const userId = user?.user?._id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    // quick fix to disable warning about missing dependency 'dispatch'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = (id: ObjectId) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour(id));
      toast.success("Tour deleted successfully");
    }
  };

  return (
    <div style={{ margin: "auto", padding: "120px", alignContent: "center" }}>
      {userTours.length === 0 && (
        <>
          <h3>No tours yet</h3>
          <Link to="/add-tour">Add one here!</Link>
        </>
      )}

      {userTours.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.user?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}

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
                      {excerpt(item.description, 40)}
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
                        onClick={() => handleDelete(item._id)}
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
