import { MDBSpinner } from "mdb-react-ui-kit";

const Spinner = () => {
  return (
    <div style={{ margin: "auto", padding: "120px", alignContent: "center" }}>
      <MDBSpinner
        className="mt-2"
        style={{ width: "3rem", height: "3rem", marginTop: "100px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    </div>
  );
};

export default Spinner;
