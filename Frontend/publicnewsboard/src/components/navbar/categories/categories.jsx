import React from "react";
import { Button } from "@material-ui/core";
import News from "../../newsElements/news/news";
import { useState } from "react";
import WeatherComponent from "./weatherComponent";
import { ErrorBoundry } from "../../ErroryBoundry";

const Categories = () => {
  const [value, setValue] = useState("");
  //Categories Array
  const categories = [
    "Economics",
    "Cars",
    "Entertainment",
    "Health",
    "Politics",
    "Sports",
    "Science",
    "Local News",
    "ALL",
  ];

  const handleClick = ({ item }) => {
    //Setting Value
    setValue(item);
  };
  return (
    <React.Fragment>
      <div className="container bg-info text-center sticky-top">
        {categories.map((item) => (
          //Taking Category Name As Object
          <Button
            key={item}
            className="shadow m-1 pb-2"
            onClick={() => handleClick({ item })}
          >
            {item}
          </Button>
        ))}
        <ErrorBoundry>
          <button className="btn btn-warning shadow">
            <WeatherComponent />
          </button>
        </ErrorBoundry>
      </div>
      {/* Passing Value To news */}
      <ErrorBoundry>
        <News value={value} />
      </ErrorBoundry>
    </React.Fragment>
  );
};

export default Categories;
