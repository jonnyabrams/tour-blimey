import { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { TourType } from "../../typings/typings";
import { createTour } from "../redux/features/tourSlice";

interface IFormData {
  title: string;
  description: string;
  tags: string[];
  imageFile: string;
}

const initialState: IFormData = {
  title: "",
  description: "",
  tags: [],
  imageFile: "",
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState<TourType>(initialState);
  const { error, loading } = useAppSelector((state) => state.tour);
  const { user } = useAppSelector((state) => state.auth);
  const { title, description, tags } = tourData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // only runs if there's an error
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setTourData({ ...tourData, [name]: value.split(",") });
    } else {
      setTourData({ ...tourData, [name]: value });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (title && description && tags) {
      const createdTourData = { ...tourData, name: user?.user?.name };
      dispatch(createTour({ createdTourData, navigate, toast }));
    }
    handleClear();
  };

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [], imageFile: "" });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>Add Tour</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                placeholder="Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Description"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-12">
              <input
                placeholder="Tags (please separate by comma)"
                type="text"
                value={tags}
                name="tags"
                onChange={onInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }: { base64: string }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
