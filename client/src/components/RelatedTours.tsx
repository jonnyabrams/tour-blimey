import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { ObjectId } from "mongoose";
import { Link } from "react-router-dom";

import { TourType } from "../../typings/typings";
import { excerpt } from "../utils/helpers";

type Props = {
  relatedTours: TourType[];
  tourId: ObjectId;
};

const RelatedTours = ({ relatedTours, tourId }: Props) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol key={item._id.toString()}>
                  <MDBCard>
                    <Link to={`/tour/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"
                      />  
                    </Link>
                    <span className="text-start tag-card">
                      {item.tags.map((tag) => (
                        <Link key={tag} to={`/tour/tag/${tag}`}>
                          {" "}
                          #{tag}
                        </Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{excerpt(item.description, 45)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;
