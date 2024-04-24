import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';

const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/hotels',
    display: 'Hotels'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
  {
    path: '/cars',
    display: 'Cars'
  },
  {
    path: '/restaurants',
    display: 'Restaurants' // Corrected typo in the path name
  }
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={`header ${isSticky ? 'sticky__header' : ''}`}>
      <Container>
        <Row>
          <div className="nav__wrapper flex flex-wrap items-center justify-between">
            {/* Logo */}
            <div className="logo">
              <img src={logo} alt="logo" className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28" />
            </div>

            {/* Navigation */}
            <div className={`navigation ${isNavOpen ? 'block' : 'hidden'} sm:block md:block lg:block xl:block mt-4 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0`}>
              <ul className="menu flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-5">
                {nav__links.map((link, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={link.path}
                      activeClassName="active__link"
                      exact={true}
                      className="nav__link"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__right flex items-center gap-4">
              <div className="nav__btns flex items-center gap-4">
                <Button className="btn secondary__btn">
                  <Link to={'/login'}>Login</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to={'/register'}>Register</Link>
                </Button>
              </div>


            </div>
          </div>
        </Row>
      </Container>
   
    </header>
  );
}
