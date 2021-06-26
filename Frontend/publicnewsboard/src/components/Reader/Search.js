import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Search = () => {
    const { searchValue } = useParams();
    const [data, setData] = useState([]);
//   const [tempData, setTempData] = useState([]);
   const history = useHistory();
  // console.log(value);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8080/readers/search/"+searchValue;
      const response = await fetch(url);
      const { data } = await response.json();
      setData(data);
    }

    fetchData();
  }, [data,searchValue]);


  const handleClick = (news) => {
    const newsId = news.newsId;
    history.push("/detailedNews/" + newsId);
  };

  return (
    <React.Fragment>
    <div className="container border border-info">
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
  </React.Fragment>
  );
};

export default Search;