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
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getToursByTag } from "../redux/features/tourSlice";
import { TourType } from "../../typings/typings";
import { excerpt } from "../utils/helpers";

const TagTours = () => {
  const { tagTours, loading } = useAppSelector((state) => state.tour);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  // will run when we have our tag
  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // quick fix to disable warning about missing dependency 'dispatch'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tours with tag: {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagTours &&
        tagTours.map((item: TourType) => (
          <MDBCardGroup key={item._id.toString()}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
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
                    <MDBCardTitle>{item.title}</MDBCardTitle>
                    <MDBCardText className="text-start">
                      {excerpt(item.description, 40)}
                    </MDBCardText>
                    <div style={{ float: "left", marginTop: "-10px" }}>
                      <MDBBtn
                        size="sm"
                        rounded
                        color="info"
                        onClick={() => navigate(`/tour/${item._id}`)}
                      >
                        Read more
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default TagTours;
