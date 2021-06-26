import "bootstrap/js/src/collapse.js";
import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AdminNavbar(props) {
  const history = useHistory();
  function logout() {
    sessionStorage.removeItem("token");
    history.push("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light mb-0 pb-0">
        <div className="container-fluid container" style={{ width: "70%" }}>
          <NavLink className="navbar-brand" to="#">
            <img
              src={require("../../Asset/logo.gif").default}
              alt=""
              width="38"
              height="37"
              className="d-inline-block align-text-top"
            />
            <span className="text-primary">
              <b className="text-primary">Precise</b>
            </span>
          </NavLink>
          <form className="d-flex  ml-n3">
            <div></div>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={logout}
            >
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <span>&nbsp;</span> Admin Logout <span>&nbsp;</span>
            </button>
          </form>
        </div>
        <span> &nbsp;&nbsp;</span>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-0 pt-0 mb-0 pb-0 ">
        <NavLink className="navbar-brand" to="/"></NavLink>
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
                className="nav-link   "
                to="/admin"
                activeClassName="active"
                exact={true}
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                className="nav-item nav-link mr-3 "
                to=""
                activeClassName="active"
                to="/approveNews"
                exact={true}
              >
                <li>Approve News</li>
              </NavLink>
              <NavLink
                className="nav-link nav-item  mr-3   "
                activeClassName="active"
                to="/reporterApprove"
              >
                <li> Approve Reporter</li>
              </NavLink>
              <NavLink
                className="nav-item nav-link mr-3   "
                activeClassName="active"
                to="/reportedNews"
              >
                <li>Reported News</li>
              </NavLink>
              <NavLink
                className="nav-item nav-link mr-3    "
                activeClassName="active"
                to="/getAllReader"
              >
                <li>All Reader</li>
              </NavLink>
              <NavLink
                className="nav-item nav-link mr-3   "
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
