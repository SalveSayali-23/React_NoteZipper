// import React from 'react'
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Header = ({ setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  // console.log(userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>
              <NavDropdown
                title={`${userInfo?.name || "User"}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
