import React from 'react';
import { Navbar, Nav, Image, Container, NavDropdown, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/indext';
import { useGame } from '../../utils/contextes/GameContext/useGame';
import { StarNavbarIcon } from './components/StarNavbarIcon';


interface NavbarComponentProps {
  homeUrl: string;
  navs: { title: string, url: string }[];
  userName: UserFullName | null;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = ({ homeUrl, navs, userName }) => {
  const navigate = useNavigate();
  const { token, signOut, userType } = useAuth();
  const { game } = useGame();
  const logout = (() => {
    if (token)
      signOut(token)
        .then(() => navigate('/'))
  })

  return (
    <>
      <Navbar expand="lg" className="bg-white p-0 shadow-sm">
        <Container fluid>
          <Col sm={9}>
            <div className="d-flex">
              <Navbar.Brand to={homeUrl} as={Link}>
                <Image
                  width={217}
                  height={93}
                  src="../../src/assets/udv_logo.svg" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {navs.map((nav, index) =>
                    (<Nav.Link key={index} to={nav.url} as={Link}>{nav.title}</Nav.Link>)
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Col>
          <Col sm={3}>
            <div className="d-flex justify-content-center">
              {userType === 'WR' && <StarNavbarIcon countStar={game?.count_stars}/>}
              <NavDropdown
                id="logout-nav-dropdown"
                drop='down'
                align='end'
                title={<Image
                  width={44}
                  height={44}
                  src="../../src/assets/user_avatar.svg" />}
              >
                <NavDropdown.Header>
                  {userName && userName.name != '' && userName.surname != '' ?
                   `${userName.surname} ${userName.name}` : 'Уважаемый пользователь'}
                </NavDropdown.Header>
                <NavDropdown.Item as="button" onClick={logout}>Выйти</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

