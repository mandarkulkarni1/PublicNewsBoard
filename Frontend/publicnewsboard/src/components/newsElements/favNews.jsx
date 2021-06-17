import React, { useEffect } from "react";
import { useState } from "react";
import './styles.css'
const FavNews = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function init() {
      const url = "http://localhost:8080/readers/news/";
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    }

    init();
  }, []);
  return (
    <div className="container-lg p-2">
      <div className="card shadow">
        <div className="card-header bg-secondry text-dark">Top News</div>
        <div className="card-body overflow-auto d-flex ">
          {/* =========================================================================== */}
          {data.map((news) => (
            <div className="col-2 m-1" key={news.newsId}>
              <div className="card" >
                <div className="shadow" >
                  <div className="card-body" id="cardd">
                    <h6 className="card-title">
                      {news.title}
                    </h6>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{news.category.charAt(0).toUpperCase()} </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* =========================================================================== */}
        </div>
      </div>
    </div>
  );
};

export default FavNews;
