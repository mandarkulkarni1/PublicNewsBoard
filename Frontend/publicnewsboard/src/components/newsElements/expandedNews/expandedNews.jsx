import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Service/newsService";
import { Share } from "../../Reader/shareWidget";
import { Button } from "@material-ui/core";
import { BiBlock } from "react-icons/bi";
import {fakeNewsSelector} from "../counterServices"

const ExpandedNews = () => {
  const { newsId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function init() {
      const { data } = await fetchData(newsId);
      console.log(data);
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
          src={`http://localhost:8080/reporters/image/${data.image}`}
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <h5 className="card-title text-white">{data.title}</h5>
          <p className="card-text text-white">{data.article}</p>
          <p className="card-text text-white">{data.city}</p>
          <Share newsId={data.title} title={data.title}/>
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