import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Service/newsService";
import { Share } from "../../sharingElements/shareWidget";
import { Button } from "@material-ui/core";
import { BiBlock } from "react-icons/bi";
import {fakeNewsSelector} from "../counterServices"

const ExpandedNews = (props) => {
  const { news } = useParams(props);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function init() {
      const { data } = await fetchData(news);
      setData(data[0]);
    }
    init();
  }, []);

  const handleClick = (news)=>{
    fakeNewsSelector(news);
  }


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
          <br/>
          <Button className="m-2"  variant="contained" color="secondary" onClick={()=>handleClick(data)}>
          <BiBlock className="m-2" />Report As Fake
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedNews;
