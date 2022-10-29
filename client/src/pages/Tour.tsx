import { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "../hooks";
import { getTour } from "../redux/features/tourSlice";
import { ObjectId } from "mongoose";

const Tour = () => {
  const dispatch = useAppDispatch();
  const { tour } = useAppSelector((state) => state.tour);
  const { id } = useParams();

  // runs once we have the id
  useEffect(() => {
    if (id) {
      // ts error as id is a string from useParams, so this to convert back to ObjectId
      dispatch(getTour(id as unknown as ObjectId));
    }
  }, [id]);

  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour?.imageFile}
            alt={tour?.title}
          />
          <MDBCardBody>
            <h3>{tour?.title}</h3>
            <span>
              <p className="text-start tour-name">Created by: {tour?.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour?.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour?.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour?.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Tour;