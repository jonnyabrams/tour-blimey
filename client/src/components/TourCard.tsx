import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { TourType } from "../../typings/typings";
import { likeTour } from "../redux/features/tourSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { excerpt } from "../utils/helpers";

const TourCard = ({ tour }: { tour: TourType }) => {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.user?._id;
  const dispatch = useAppDispatch();

  const Likes = () => {
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(likeTour({ id: tour._id, userId }));
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <Link to={`/tour/${tour._id}`}>
          {" "}
          <MDBCardImage
            src={tour.imageFile}
            alt={tour.title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          />
        </Link>
        <div className="top-left">{tour.name}</div>
        <span className="text-start tag-card">
          {tour.tags.map((tag) => (
            <Link key={tag} to={`/tours/tag/${tag}`}>
              #{tag}{" "}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={handleLike}
          >
            <Likes />
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(tour.description, 45)}{" "}
            <Link to={`/tour/${tour._id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourCard;
