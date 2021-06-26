import React from "react";
import { Button } from "@material-ui/core";
import News from "../../newsElements/news/news";
import { useState } from "react";

const Categories = () => {
  const [value, setValue] = useState("");
  const categories = [
    "economics",
    "science and tech",
    "Politics",
    "Economics",
    "Sports",
    "Regional",
<<<<<<< HEAD
    "Entertainment"
=======
    "ALL"
>>>>>>> 1154f0f055eaea8dd0c9414c4805ede8c2c04218
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