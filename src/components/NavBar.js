import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><strong>NewsAgent</strong></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/"><strong>Home</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/business"><strong>Business</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment"><strong>Entertainment</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health"><strong>Health</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science"><strong>Science</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports"><strong>Sports</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology"><strong>Technology</strong></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;