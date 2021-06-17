import React, { useEffect, useState } from "react";

const News = () => {
  const [data, setData] = useState([]);

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
      <div className="container">
        <div className="m-2 row justify-content-between ">
          {data.map((news) => (
            <div class=" col-3 m-3 shadow">
              <div class="card">
                <img
                  class="card-img-top"
                  src="https://picsum.photos/300"
                  alt="Card image cap"
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

export default News;
