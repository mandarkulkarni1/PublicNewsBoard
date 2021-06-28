import "bootstrap/js/src/collapse.js";
import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar(props) {

  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-0  ">
        <NavLink className="navbar-brand" to="/">
          {" "}
          <span></span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="container " style={{ width: "80%" }}>
            <div className="navbar-nav ">
              <NavLink
                className="nav-item high nav-link  mr-3 "
                to="/admin"
                activeClassName="active"
                exact={true}
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                className="nav-item high nav-link mr-3 "
                activeClassName="active"
                to="/approveNews"
                exact={true}
              >
                <li>Approve News</li>
              </NavLink>
              <NavLink
                className="nav-link high nav-item  mr-3   "
                activeClassName="active"
                to="/reporterApprove"
              >
                <li> Approve Reporter</li>
              </NavLink>
              <NavLink
                className="nav-item high nav-link mr-3   "
                activeClassName="active"
                to="/reportedNews"
              >
                <li>Reported News</li>
              </NavLink>
              <NavLink
                className="nav-item high nav-link mr-3    "
                activeClassName="active"
                to="/getAllReader"
              >
                <li>All Reader</li>
              </NavLink>
              <NavLink
                className="nav-item high nav-link mr-3   "
                activeClassName="active"
                to="/getAllReporter"
              >
                <li>All Reporter</li>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
