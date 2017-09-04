import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">Comments</Link>
      </div>
      <ul className="nav navbar-nav">
        <li >
          <Link to="/">New Post</Link>
        </li>
        <li >
          <Link to="/search">Sort</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
