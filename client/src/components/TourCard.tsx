import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBCardOverlay,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { TourType } from "../../typings/typings";
import { excerpt } from "../helpers";

const TourCard = ({ tour }: { tour: TourType }) => {
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
          {tour.tags.map((tag) => `#${tag} `)}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(tour.description)}{" "}
            <Link to={`/tour/${tour._id}`}>Read more</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourCard;
