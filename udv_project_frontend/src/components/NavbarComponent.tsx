import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface NavbarComponentProps {
  homeUrl: string;
  navs: { title: string, url: string }[];
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ homeUrl, navs }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-white p-0 shadow-sm container-fluid">
        <div className='container-fluid'>
          <Navbar.Brand to={homeUrl} as={Link}>
            <Image
              width={217}
              height={93}
              src="../../src/assets/udv_logo.svg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navs.map((nav, index) => (<Nav.Link key={index} to={nav.url} as={Link}>{nav.title}</Nav.Link>))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};