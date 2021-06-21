import React, { useEffect, useState } from "react";
import { GetNews } from "../Service/GetNewsService";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/readers/news/";
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
      //   console.log(typeof(data))
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="container-lg">
        <div className="card shadow">
          <div className="card-header bg-secondry text-dark">Top News</div>
          <div className="card-body overflow-auto d-flex ">
            {/* =========================================================================== */}
            {data.map((news) => (
              <div className="col-2 m-1 " key={news.newsId}>
                <div className="card">
                  <div>
                    <div className="card-body m-n2" id="cardd">
                      <img
                        className="btn card-img-top m-n2"
                        src="https://picsum.photos/200"
                        height="80px"
                      ></img>
                      <h6
                        onClick={() => {
                          history.push("/adminNews/" + news.newsId);
                        }}
                        className="btn card-title h6 m-n1"
                      >
                        {news.title}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* =========================================================================== */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="m-2 row justify-content-between ">
          {data.map((news) => (
            <div class=" col-3 m-2 shadow">
              <div class="card">
                <img
                  className="card-img-top"
                  src="https://picsum.photos/300"
                  alt="Card"
                  height="200px"
                />
                <div class="card-body">
                  <h5 class="card-title">{news.title}</h5>
                  <p class="card-text">{news.article}</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">{news.city}</small>
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

export default Dashboard;
