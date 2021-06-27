import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles({
  root: {
    maxWidth: 180,
    maxHeight: 200
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const news = props.news;
  const handleClick = props.handleclick;
  return (
      <div className="col-2 m-1 shadow text-wrap" onClick={()=>{handleClick(news)}}>
    <Card className={classes.root}>
      <CardActionArea>
        <img
          className="card-img-top"
          src={`http://localhost:8080/reporters/image/${news.image}`}
          alt="news"
          height="100px"
        ></img>
       <CardContent><div className="text-truncate">{news.title}</div></CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
