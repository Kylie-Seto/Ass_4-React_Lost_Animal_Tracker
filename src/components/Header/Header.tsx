import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <>
      <Navbar className="border-bottom" expand="sm">
        <Container>
          <Navbar.Brand href="/mapView">TailBlazer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            {/* Left-aligned links */}
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/mapView">
                Map View
              </Nav.Link>
            </Nav>

            {/* Right-aligned links (ms-auto pushes report button the right edge) */}
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/submitReport">
                <Button variant="danger" size="sm">Submit Report</Button>
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;