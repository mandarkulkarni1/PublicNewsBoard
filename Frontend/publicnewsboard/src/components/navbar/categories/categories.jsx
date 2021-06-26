import React from "react";
import { Button } from "@material-ui/core";
import News from "../../newsElements/news/news";
import { useState } from "react";

const Categories = () => {
  const [value, setValue] = useState("");
  const categories = [
    "Economics",
    "Cars",
    "Entertainment",
    "Health",
    "Politics",
    "Sports",
    "Science",
    "ALL"
  ];

  const handleClick = ({item}) => {
    setValue(item);

  };
  return (
    <React.Fragment>
      <div className="container bg-info text-center sticky-top">
        {categories.map((item) => (
          <Button
            key={item}
            className="shadow m-1 pb-2"
            onClick={() => handleClick({ item })}
          >
            {item}
          </Button>
        ))}
      </div>
      <News value={value}/>
    </React.Fragment>
  );
};

export default Categories;