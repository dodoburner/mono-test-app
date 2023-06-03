import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useSignOut } from "react-auth-kit";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import UserContext from "../common/context/userContext";

function Header() {
  const signOut = useSignOut();
  const userStore = useContext(UserContext);
  const { user } = userStore;

  const handleSignOut = () => {
    signOut();
    userStore.removeUser();
  };

  return (
    <Navbar bg="light" variant="light" className="mb-5">
      <Container>
        <Nav className="d-flex gap-3">
          <Nav.Item>
            <Link to="/vehicles">Home</Link>
          </Nav.Item>
          {user ? (
            <Nav.Item
              role="button"
              className="text-danger"
              onClick={handleSignOut}
            >
              Logout
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Link to="/login">Login</Link>
            </Nav.Item>
          )}
        </Nav>

        {user && (
          <Navbar.Text>
            Signed in as:{" "}
            <span className="text-dark fst-italic">{user.userName}</span>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
}

export default observer(Header);
