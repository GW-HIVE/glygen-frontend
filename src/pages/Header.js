
import React from "react";
import {
  Form,
  NavDropdown,
  Navbar,
  Nav,
  FormControl,
  Button
} from 'react-bootstrap'

const Header = () => (
  <>
    <Navbar bg="light" expand="lg">
        <Nav className="mr-auto">
        <Nav.Link href="/home">GlyGen</Nav.Link>
          <Nav.Link href="/home">HOME</Nav.Link>
          <NavDropdown title="EXPLORE" id="basic-nav-dropdown">
            <NavDropdown.Item href="/glycan_search">Glycan Search</NavDropdown.Item>
            <NavDropdown.Item href="/protein_search">Protein Search</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/quick_search">QUICK SEARCH</Nav.Link>
          <Nav.Link href="/try_me">TRY ME</Nav.Link>
          <Nav.Link href="/data">DATA</Nav.Link>
          <NavDropdown title="HELP" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
            <NavDropdown.Item href="/contact_us">Contact Us</NavDropdown.Item>
            <NavDropdown.Item href="/feedback">Feedback</NavDropdown.Item>
            <NavDropdown.Item href="/how_to_cite">How to Cite</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="MORE" id="basic-nav-dropdown">
            <NavDropdown.Item href="/media">Media</NavDropdown.Item>
            <NavDropdown.Item href="/resources">Resources</NavDropdown.Item>
            <NavDropdown.Item href="/frameworks">Frameworks</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <Nav.Link href="/glygen">Beta Testing</Nav.Link>
        <Nav.Link href="/glygen">MY GLYGEN</Nav.Link>
    </Navbar>
  </>
);

export default Header;