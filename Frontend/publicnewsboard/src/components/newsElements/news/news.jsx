import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
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

  const handleClick = (news) => {
    const newsId = news.newsId;
    history.push("/detailedNews/" + newsId);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="m-2 row justify-content-between ">
          {data.map((news) => (
            <div
              className=" col-3 m-3 shadow"
              key={news.newsId}
              onClick={() => {
                handleClick(news);
              }}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/300"
                  alt="Card image cap"
                  height="200px"
                />
                <div className="card-body">
                  <h5 className="card-title">{news.title}</h5>
                  <p className="card-text">{news.article}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{news.city}</small>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default News;
