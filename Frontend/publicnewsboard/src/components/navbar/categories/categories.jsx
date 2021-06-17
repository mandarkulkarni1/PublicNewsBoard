import React from "react";
import { Button } from "@material-ui/core";

const Categories = () => {
  const categories = [
    "Economics",
    "Science & Technology",
    "Political",
    "Child Abuse",
    "Sports",
    "Regional",
  ];
  return (
    <div className="container bg-info">
      {categories.map((item) => (
        <Button key={item} className='m-1 pb-2'>{item}</Button>
      ))}
    </div>
  );
};

export default Categories;
