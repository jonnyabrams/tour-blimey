import { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import { ObjectId } from "mongoose";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";

const Tour = () => {
  const dispatch = useAppDispatch();
  const { tour, relatedTours } = useAppSelector((state) => state.tour);
  const { id } = useParams();
  const tags = tour?.tags;

  // runs once we have the id
  useEffect(() => {
    if (id) {
      // ts error as id is a string from useParams, so this to convert back to ObjectId
      dispatch(getTour(id as unknown as ObjectId));
    }
  }, [id]);

  // runs when we have the tags
  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

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
                {tour?.tags.map((tag) => (
                  <Link key={tag} to={`/tours/tag/${tag}`}>
                    #{tag}{" "}
                  </Link>
                ))}
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
          <RelatedTours relatedTours={relatedTours} tourId={tour?._id} />
        </MDBCard>
        <DisqusThread id={id} title={tour?.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default Tour;
