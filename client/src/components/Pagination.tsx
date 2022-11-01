import {
  ActionCreatorWithPayload,
  AnyAction,
  Dispatch,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";
import { IToursState, IUserState } from "../../typings/typings";

type Props = {
  setCurrentPage: ActionCreatorWithPayload<any, string>;
  currentPage: number;
  numberOfPages: number;
  dispatch: ThunkDispatch<
    {
      auth: IUserState;
      tour: IToursState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
};

const Pagination = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}: Props) => {
  const renderPagination = () => {
    // don't show pagination if there's only 1 page
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <p className="fw-bold mt-1">1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className="mx-2"
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className="fw-bold mt-1">{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className="mt-4">{renderPagination()}</div>;
};

export default Pagination;
