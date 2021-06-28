import React, { Component } from "react";

import {
  AiOutlineSearch,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { createRef } from "react";
import { withRouter } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";

import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  state = {};
  static contextType = ThemeContext;

  constructor() {
    super();
    this.searchRef = createRef();
  }

  componentDidMount() {
    const themeContext = this.context;
    console.log(themeContext);
  }

  componentDidUpdate() {
    const themeContext = this.context;
    console.log(themeContext);
  }

  handleSearch() {
    let searchValue = this.searchRef.current.value;
    searchValue = searchValue.trim().replaceAll(" ", "+");
    if (searchValue === "") this.props.history.push("/");
    else this.props.history.push("/searchResult/" + searchValue);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#0dcaf1" }}>
        <nav className="sticky-top navbar navbar-expand-lg bg-info font-weight-bold container">
          <a
            className="navbar-brand mx-1 text-dark"
            href="#"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            NewsBoard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container p-1">
            <input
              className="form-control"
              type="search"
              placeholder="Search by title, headline, city or locality"
              ref={this.searchRef}
              onChange={() => {
                this.handleSearch();
              }}
            />
            <button
              className="btn"
              onClick={() => {
                this.handleSearch();
              }}
            >
              <AiOutlineSearch />
            </button>
          </div>
          {sessionStorage.getItem("isLoggedIn") ? (
            /*<AiOutlineLogout
              className="mx-3"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Log Out"
              onClick={() => {
                sessionStorage.clear();
                this.props.history.push("/");
              }}
            />*/
            <button
              className="btn btn-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Log In"
              onClick={() => {
                sessionStorage.clear();
                this.props.history.push("/");
              }}
            >
              <i className="fa fa-sign-out  text-white" aria-hidden="true">
                Logout
              </i>
            </button>
          ) : (
            <Link to="/login">
              {/* <AiOutlineUser
                className="mx-3"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Log In"
             /> */}

              <button
                className="btn btn-light"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Log In"
              >
                <i className="fa fa-sign-out" aria-hidden="true">
                  Login
                </i>
              </button>
            </Link>
          )}
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
