import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { TourType } from "../../typings/typings";
import Spinner from "../components/Spinner";
import TourCard from "../components/TourCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAllTours, setCurrentPage } from "../redux/features/tourSlice";
import Pagination from "../components/Pagination";

// get query
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const { tours, loading, currentPage, numberOfPages } = useAppSelector(
    (state) => state.tour
  );
  const dispatch = useAppDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  // trigger getAllTours in tourSlice which populates state.tours, extracted above
  useEffect(() => {
    dispatch(getAllTours(currentPage));
    // quick fix to disable warning about missing dependency 'dispatch'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No tours found
          </MDBTypography>
        )}

        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            We couldn't find any matches for "{searchQuery}"
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

      {/* only show pagination if there are tours */}
      {tours.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
