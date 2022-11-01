import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
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
    // if there are likes
    if (tour.likes.length > 0) {
      // if the likes include current user
      return tour.likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {/* if the likes include current user and are more than 2 */}
          {tour.likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${tour.likes.length - 1} others liked this`}
            >
              {tour.likes.length} likes
            </MDBTooltip>
          ) : (
            // if the likes include current user and are 2 or less
            `${tour.likes.length} like${tour.likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        // if likes exist but don't include current user
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{tour.likes.length} {tour.likes.length === 1 ? "like" : "likes"}
        </>
      );
    }
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
            {user?.user?._id && <Likes />}
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
