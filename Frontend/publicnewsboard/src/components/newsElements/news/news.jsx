import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import filterUtil from "./filter";
import Card from "./newsCard";
import { setViews } from "../counterServices";

const News = ( {value} ) => {
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
  }, [data,value]);

  const handleClick = (news) => {
    const newsId = news.newsId;
    setViews(news.newsId);
    history.push("/detailedNews/" + newsId);
  };
  return (
    <React.Fragment>
      <Card
        news={tempData.length ? tempData : data}
        handleClick={handleClick}
      />
    </React.Fragment>
  );
};

export default News;