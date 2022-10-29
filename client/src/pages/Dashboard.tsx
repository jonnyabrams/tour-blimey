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
  return <div>Dashboard</div>;
};

export default Dashboard;
