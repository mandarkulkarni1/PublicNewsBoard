import "bootstrap/js/src/collapse.js";
import React from "react";
import { NavLink } from "react-router-dom";
import "./adminStyle.css";
import { Button } from "@material-ui/core";

function AdminNavbar(props) {
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  return (
    <div>
      <div class="topnav" id="myTopnav">
        <a href="/admin" className="high" style={{ marginLeft: "100px" }}>
          Home
        </a>
        <a href="/approveNews" className="high" activeClassName="active">
          Approve News
        </a>
        <a href="/reporterApprove" className="high" activeClassName="active">
          Approve Reporter
        </a>
        <a href="/reportedNews" className="high" activeClassName="active">
          Reported News
        </a>
        <a href="/getAllReader" className="high" activeClassName="active">
          All Reader
        </a>
        <a href="/getAllReporter" className="high" activeClassName="active">
          All Reporter
        </a>

        <a href="javascript:void(0);" className="icon" onClick={myFunction}>
          <i class="fa fa-bars"></i>
        </a>
      </div>
    </div>
  );
}

export default AdminNavbar;
