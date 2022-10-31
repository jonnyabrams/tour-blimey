import { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          Tour Blimey
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.user?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "27px" }}>
                Logged in as {user?.user?.name}
              </h5>
            )}
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {/* check for id on user object from user returned from state */}
            {user?.user?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/add-tour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}

            {user?.user?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>
                    Log out
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Log in</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search tours"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div style={{ marginTop: "5px", marginLeft: "5px" }}>
            <MDBIcon
              style={{ cursor: "pointer" }}
              fas
              icon="search"
              onClick={handleSubmit}
            />
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
