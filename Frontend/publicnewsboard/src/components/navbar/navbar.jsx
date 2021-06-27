  
import React, { Component } from "react";
import { BsFillBrightnessAltHighFill } from "react-icons/bs";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { createRef } from 'react';
import { withRouter } from 'react-router-dom';
import ThemeContext from "../context/ThemeContext";

import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends Component {
  state = {};
  static contextType = ThemeContext;


  constructor() {
    super()
    this.searchRef = createRef();
   
  }

  componentDidMount() {
    const themeContext=this.context;
    console.log(themeContext);
  }

  componentDidUpdate(){
    const themeContext=this.context;
    console.log(themeContext);
  }

  handleSearch(){
   
    let searchValue=this.searchRef.current.value;
    searchValue=searchValue.trim().replaceAll(" ","+");
    this.props.history.push('/searchResult/'+searchValue);
  }

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
              placeholder="Search by title, headline, city or locality"
              ref={this.searchRef}
              onChange={() => {
                this.handleSearch();
              }}
            />
            <button className="btn"
             onClick={() => {
              this.handleSearch();
            }}>
              <AiOutlineSearch />
            </button>
          </div>
          <Link to="/login">
            <AiOutlineUser className="mx-3" />
          </Link>
          <BsFillBrightnessAltHighFill className="mx-3" 
           onClick={() => {
            this.context.toggleTheme(!this.context.theme);
          }}/>
        </nav>
      </div>
    );
  }

}

export default withRouter(Navbar);


