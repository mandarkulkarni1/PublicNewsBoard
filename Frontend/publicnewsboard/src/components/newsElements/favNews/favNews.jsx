import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
const FavNews = () => {
  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function init() {
      const url = "http://localhost:8080/readers/news/top10";
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
      // console.log(data);
    }

    init();
  }, []);

  const handleclick = (news) => {
    history.push("/detailedNews/" + news.newsId);
  };

  return (
    <div className="container-lg p-2">
      <div className="card shadow">
        <div className="card-header bg-secondry text-dark">Top News</div>
        <div className="card-body overflow-auto d-flex ">
          {/* =========================================================================== */}
          {data.map((news) => (
            <div
              className="col-2 m-1"
              key={news.newsId}
              onClick={() => handleclick(news)}
            >
              <div className="card">
                <div className="shadow">
                  <div className="card-body" id="cardd">
                    <img
                      className="card-img-top"
                      src="https://picsum.photos/200"
                      height="80px"
                    ></img>
                    <h6 className="card-title my-1">{news.title}</h6>
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
