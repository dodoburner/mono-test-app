/* eslint-disable */
import React from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Header() {
  const signOut = useSignOut();
  const authState = useAuthUser();
  const user = authState()?.userName;

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
              onClick={() => signOut()}
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
            Signed in as: <span className="text-dark fst-italic">{user}</span>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
}
