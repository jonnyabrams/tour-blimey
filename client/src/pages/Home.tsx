import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useEffect } from "react";

import { TourType } from "../../typings/typings";
import Spinner from "../components/Spinner";
import TourCard from "../components/TourCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllTours } from "../redux/features/tourSlice";

const Home = () => {
  const { tours, loading } = useAppSelector((state) => state.tour);
  const dispatch = useAppDispatch();

  // trigger getAllTours in tourSlice which populates state.tours, extracted above
  useEffect(() => {
    dispatch(getAllTours());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No tours found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((tour: TourType, index: number) => (
                  <TourCard tour={tour} key={index} />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Home;
