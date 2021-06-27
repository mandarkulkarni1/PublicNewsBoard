import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { setViews } from "../counterServices";
import Cardd from "./Cardd";
const FavNews = () => {
  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function init() {
      const url = "http://localhost:8080/readers/news/top10";
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    }

    init();
  }, []);

  const handleclick = (news) => {
    setViews(news.newsId);
    history.push("/detailedNews/" + news.newsId);
  };

  return (
    <div className="container-lg p-2">
      <div className="card shadow">
        <div className="card-header bg-secondry text-dark">Top News</div>
        <div className="card-body overflow-auto d-flex ">
          {data.map((news) => (
            <Cardd handleclick={handleclick} news={news} id="cardd"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavNews;
