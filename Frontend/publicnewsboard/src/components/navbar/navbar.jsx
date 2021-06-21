import React, { Component } from "react";
import { BsFillBrightnessAltHighFill } from "react-icons/bs";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import Categories from "./categories/categories";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div style={{ backgroundColor: "#0dcaf1" }}>
        <nav className="sticky-top navbar navbar-expand-lg bg-info font-weight-bold container">
          <a className="navbar-brand mx-1 text-dark" href="#">
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
              placeholder="Search"
            />
            <button className="btn">
              <AiOutlineSearch />
            </button>
          </div>
          <Link to="/login">
            <AiOutlineUser className="mx-3" />
          </Link>
          <BsFillBrightnessAltHighFill className="mx-3" />
        </nav>
        {/* <hr/> */}
        <Categories />
      </div>
    );
  }
}

export default Navbar;
