import React from 'react'
import './style.css'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
function NavBar(props) {
    const history = useHistory();
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
             <a href="/reporter" class="active" style={{marginLeft:"100px"}}>Home</a>
              <a  onClick={()=>{props.onChangeAllNews(true)}}>All News</a>
              <a  onClick={()=>props.onChangeCity("true")}>Local News</a>
              <a onClick={()=>{props.onChangeReporterNews(true)}}>Reporter News</a>
             <a href="/addNews">Upload News</a>
             <a href="/videoUpload">Upload Video</a>
             <a href="javascript:void(0);" class="icon" onClick={myFunction}>
             <i class="fa fa-bars"></i>
            </a>
      </div>
        </div>
    )
}

export default NavBar
