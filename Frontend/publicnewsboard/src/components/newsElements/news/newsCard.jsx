import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AiOutlineEye } from "react-icons/ai";
import { GiModernCity } from "react-icons/gi";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function Cardd(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleClick = props.handleClick;
  const news = props.news;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log();
  return (
    <div className="shadow-lg ">
      <Card className={classes.root}>
        <div
          onClick={() => {
            handleClick(news);
          }}
        >
          <img
            className="card-img-top"
            src={`http://localhost:8080/reporters/image/${news.image}`}
            height="200px"
            alt="news"
          ></img>
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {news.title}
            </Typography>
          </CardContent>
          <span className="mx-2 text-muted ">
            <AiOutlineEye size="22px" />
            &nbsp;Views: {news.views}
          </span>
        </div>
        <CardActions disableSpacing>
          <span className="mx-2 text-muted ">
            <GiModernCity size="18px" />
            &nbsp;City: {news.city}
          </span>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography color="textSecondary">{news.article}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
