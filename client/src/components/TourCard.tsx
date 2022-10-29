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

const TourCard = ({ tour }: { tour: TourType }) => {
  // reduce length of the tour description
  const excerpt = (str: string) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={tour.imageFile}
          alt={tour.title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{tour.name}</div>
        <span className="text-start tag-card">
          {tour.tags.map((tag) => `#${tag} `)}
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{tour.title}</MDBCardTitle>
          <MDBCardText className="text-start">{excerpt(tour.description)} <Link to={`/tour/${tour._id}`}>Read more</Link></MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default TourCard;
