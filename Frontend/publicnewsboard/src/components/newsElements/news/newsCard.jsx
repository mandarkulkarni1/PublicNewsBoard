import { useState } from "react";

const Card = (props) => {
  const st = props.news;
  const handleClick = props.handleClick;
  return (
    <div className="container border border-info">
      <div className="m-2 row justify-content-between ">
        {st.map((news) => (
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
                src={`http://localhost:8080/reporters/image/${news.image}`}
                alt="Card cap"
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
  );
};

export default Card;
