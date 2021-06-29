import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Service/newsService";
import { Share } from "../../Reader/shareWidget";
import { Button } from "@material-ui/core";
import { fakeNewsSelector } from "../counterServices";
import ReportFake from "./ReportFake";
import "./style.css";
import { useHistory } from "react-router-dom";

const ExpandedNews = () => {
  const { newsId } = useParams();
  const [data, setData] = useState([]);
  const user =
    window.sessionStorage.getItem("reader") ||
    window.sessionStorage.getItem("reporter");
  const history = useHistory();
  useEffect(() => {
    async function init() {
      const { data } = await fetchData(newsId);
      setData(data[0]);
    }
    init();
  }, [newsId]);

  const handleClick = (news) => {
    fakeNewsSelector(news);
  };

  if (user) {
    return (
      <div className="container ">
        <div className="card mk text-white m-3 ">
          <img
            className="card-img-top"
            src={`http://localhost:8080/reporters/image/${data.image}`}
            alt="news"
            height="450vh"
          ></img>
          <div className="card-img-overlay overlay">
            <div className="mk">
              <h3 className=" card-title text-white text-center">
                {data.title}
              </h3>
              <h6 className="card-text text-white">{data.article}</h6>
              <h5 className="card-text text-secondary">{data.city}</h5>

                <span className="text-white">Views: {data.views}</span>
              <div className="text-center">
                <Share newsId={data.title} title={data.title} />
                <Button variant="contained" color="secondary">
                  <ReportFake data={data} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div>{history.push("/login")}</div>;
};

export default ExpandedNews;
