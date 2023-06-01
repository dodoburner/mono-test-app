/* eslint-disable */
import React from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  const signOut = useSignOut();
  const authState = useAuthUser();
  const user = authState()?.username;

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          {user ? (
            <Nav.Link className="text-danger" onClick={() => signOut()}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
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
