import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">Library</Link>
      </div>
      <ul className="nav navbar-nav">
        <li className={location.pathname === "/" && "active"}>
          <Link to="/">Private Library</Link>
        </li>
        <li className={location.pathname === "/search" && "active"}>
          <Link to="/search">Public Library</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
