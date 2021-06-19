import React from "react";
import { useState, useEffect } from "react";
import "./reporter.style.css";
import { Button } from "@material-ui/core";
import { GetNews, GetNewsTop } from "../Service/GetNewsService";
import { ToastContainer, toast } from "react-toastify";

function Reporter() {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState([]);
  const reporter = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    toast.success("Welcome " + reporter.userName);
    async function getData() {
      console.log("use effect");

      const news = await GetNews();
      console.log(news.data);
      setNews(news.data);

      console.log("use effect1");
    }
    async function getTop10() {
      console.log("use effect");

      const news = await GetNewsTop();
      console.log(news.data);
      setTopNews(news.data);

      console.log("use effect1");
    }

    getTop10();
    getData();
  },[]);
  const [readMore, setReadMore] = useState(false);

  const linkName = readMore ? "Read Less << " : "Read More >> ";

  return (
    <div className="row">
      <div className="left">
        <h2>Headlines</h2>
        <h5>Latest Headlines</h5>

        {topNews.map((data) => (
          <>
            <div className="headline" style={{ height: "60px" }}>
              <a href="https://news.microsoft.com/june-2021-hybrid-work/">
                {data.article.slice(0, 30)}...
              </a>
            </div>
            <br />
          </>
        ))}
      </div>
      <div className="main">
        <h2>News</h2>
        {news.map((data) => (
          <div className="news" key={data.newsId}>
            <h2 className="title">{data.title}</h2>
            <h3>{data.category} </h3>
            <div className="time">
              Published On : {data.publish_date.split("T")[0]}{" "}
              {data.publish_date.split("T")[1]}
            </div>
            <div className="img" style={{ height: "200px" }}>
              <img
                className="img"
                style={{ height: "200px" }}
                src={`http://localhost:8080/readers/image/${data.image}`}
                alt=""
              ></img>
            </div>
            <p>
              Place : {data.city},{data.locality}
            </p>
            <div>{data.article.slice(0, 150)}...</div>
            <a
              href
              className="read-more-link"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              <h2>{linkName}</h2>
            </a>
            {readMore && (
              <div>
                <p className="extra-content">{data.article}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="right">
        <h2>Press Tools</h2>
        <div style={{ height: "100px" }}>
          <Button color="primary">
            <a href="/addNews">Upload News</a>
          </Button>{" "}
          <div className="time">{new Date().toLocaleString() + ""}</div>
        </div>
        <div>
          <h4>Top Stories</h4>
          <div className="fakeimg" style={{ height: "200px" }}>
            Image
          </div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>
        <div>
          <h4>Top Stories</h4>
          <div className="fakeimg" style={{ height: "200px" }}>
            Image
          </div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Reporter;
