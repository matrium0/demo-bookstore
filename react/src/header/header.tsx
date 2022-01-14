import React, {useState} from 'react';
import "./header.scss";
import {NavLink} from 'react-router-dom';
import logo from '../assets/demo-bookstore-gold-48px.png';
import logoAppendixSmall from '../assets/react-gold-18px.png';
import ApplicationContext from '../shared/ApplicationContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {NavDropdown} from 'react-bootstrap';

const Header = () => {
  const applicationContext = React.useContext(ApplicationContext);

  const [menuCollapsed, setMenuCollapsed] = useState(true);

  return (
      <header className="navbar navbar-expand-md navbar-light shadow p-0">
        <NavLink to="/" className="navbar-brand d-flex align-items-center ms-0 ms-md-3 me-0">
          <img src={logo} className="logo-image" alt="logo"/>
          <img src={logoAppendixSmall} className="logo-image-appendix-small" alt="logo appendix"/>
        </NavLink>
        <button onClick={() => setMenuCollapsed(!menuCollapsed)} className="navbar-toggler m-2" type="button" aria-expanded="false"
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>
        <div id="navbarNav" className={"navbar-collapse justify-content-between align-items-center mt-2 " + (menuCollapsed ? "d-none" : "")}>
          <ul className="navbar-nav w-100 ms-0 ms-lg-2">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/your-books" className="nav-link">
                Your Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/library" className="nav-link">
                Library
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/authors" className="nav-link">
                Authors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/ticTacToe" className="nav-link">
                Tic Tac Toe
              </NavLink>
            </li>
            {applicationContext.user &&
                <>
                  <li className="d-md-none mb-2 logout-link-mobile">
                    <button onClick={() => handleLogoutClick()} className="btn btn-link link-dark fs-5 text-decoration-none">log
                      out <span className="fw-bold">"{applicationContext.user}"</span></button>
                  </li>
                  <div className="d-none d-md-block ms-md-auto me-3">
                    <NavDropdown id="dropdown-basic-button" title={<FontAwesomeIcon icon={faUserCircle} size={'2x'}/>}>
                      <div className="d-flex flex-column align-items-center fs-4 mx-3">
                        <div>logged in as</div>
                        <div className="fw-bold">"{applicationContext.user}"</div>
                        <button className="btn btn-secondary my-2">log out</button>
                      </div>
                    </NavDropdown>
                  </div>
                </>
            }
          </ul>
        </div>
      </header>
  );
};

function handleLogoutClick() {
  //TODO add gloabel message hand
  //TODO display message: login/logout functionality is not supported in this demo

}

export default Header;
