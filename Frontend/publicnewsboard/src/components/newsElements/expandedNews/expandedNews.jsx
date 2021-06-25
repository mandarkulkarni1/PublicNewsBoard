import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../Service/newsService";
import { Share } from "../../Reader/shareWidget";

const ExpandedNews = () => {
  const { newsId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function init() {
      const { data } = await fetchData(newsId);
      console.log(data);
      setData(data[0]);
    }
    init();
  }, []);

  return (
    <div className="container ">
      <div className="card text-white m-3 ">
        <img
          src="https://mdbootstrap.com/img/new/slides/017.jpg"
          className="card-img"
          alt="..."
        />
        <div className="card-img-overlay">
          <h5 className="card-title text-white">{data.title}</h5>
          <p className="card-text text-white">{data.article}</p>
          <p className="card-text text-white">{data.city}</p>
          <Share newsId={data.title} title={data.title}/>
        </div>
      </div>
    </div>
  );
};

export default ExpandedNews;