import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import filterUtil from "./filter";
import { setViews } from "../counterServices";
import Cardd from "./newsCard";

const News = ({ value }) => {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/readers/news/";
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setTempData(filterUtil(data, value));
  }, [data, value]);

  const handleClick = (news) => {
    const newsId = news.newsId;
    setViews(news.newsId);
    history.push("/detailedNews/" + newsId);
  };
  const news = tempData.length ? tempData : data;
  return (
    <React.Fragment>
      <div className="container border border-info">
        <div className=" m-2 justify-content-around" >
          {news.map((news) => (
            <div key={news.newsId} className="d-inline-flex flex-row col-4 p-2">
              <Cardd  news={news} handleClick={handleClick} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
