import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Service/newsService";
import { Share } from "../../Reader/shareWidget";
import { Button } from "@material-ui/core";
import { BiBlock } from "react-icons/bi";
import {fakeNewsSelector} from "../counterServices"


import ReportFake from "./ReportFake";
import { setViews } from "../counterServices";


const ExpandedNews = () => {
  const { newsId } = useParams();
  const [data, setData] = useState([]);
  const user = window.sessionStorage.getItem("user");

  useEffect(() => {
    async function init() {
      const { data } = await fetchData(newsId);
      console.log(data);
      setData(data[0]);
      // setViews(data);
    }
    init();
  }, []);


  const handleClick = (news)=>{
    fakeNewsSelector(news);
  }

  if (user) {
    return (
      <div className="container ">
        <div className="card text-white m-3 ">
          <img
            src="https://mdbootstrap.com/img/new/slides/017.jpg"
            className="card-img"
            alt="..."
          />
          <div className="card-img-overlay">
            <h5 className="card-title text-white">{data.title}</h5>
            <p className="card-text text-white">{data.article}</p>
            <p className="card-text text-white">{data.city}</p>
            <Share newsId={data.title} title={data.title} />
            <br />
            <Button variant="contained" color="secondary">
            <ReportFake data={data}/>
            </Button>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <h1 className="container text-center mt-4 p-3 border border-danger">
        Please Login First
      </h1>
    );
};

export default ExpandedNews;