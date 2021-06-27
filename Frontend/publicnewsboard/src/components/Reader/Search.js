import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cardd from "../newsElements/news/newsCard";

const SearchNoResult = () =>(<h3>No results found</h3>);

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

  if(data.length===0)
  return <SearchNoResult/>

  return (
    <React.Fragment>
      <div className="container border border-info">
        <div className=" m-2 justify-content-around" >
          {data.map((news) => (
            <div className="d-inline-flex flex-row col-4 p-2">
              <Cardd  news={news} handleClick={handleClick} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Search;