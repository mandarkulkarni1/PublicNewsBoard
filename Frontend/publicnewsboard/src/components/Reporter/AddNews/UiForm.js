import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextareaAutosize,
  Select,
  Button,
  InputLabel,
} from "@material-ui/core";
import "./Form.styles.css";
import { useHistory } from "react-router";
import NewsContext from "../../context/NewsContext";
import axios from "axios";
import { AddNewsService } from "../../Service/AddNewsService";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function UiForm() {
  const classes = useStyles();
  const history = useHistory();
  const { setNewsId } = useContext(NewsContext);

  const [news, setNews] = useState({
    title: "",
    city: "",
    locality: "",
    category: "",
    article: "",
    image: [null],
  });

  const reporter = JSON.parse(sessionStorage.getItem("reporter"));

  // console.log(reporter)

  const [count, setCount] = useState(0);
  function handleInputChange(e) {
    //console.log(e.target.value)
    if (e.target.name === "article") {
      setCount(e.target.value.length);
    }
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  }

  const handleUploadClick = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(news);

    const formData = new FormData();
    formData.append(
      "title",
      news.title.replace(/\b(\w)/g, (s) => s.toUpperCase())
    );
    formData.append("image", news.image);
    formData.append(
      "article",
      news.article.charAt(0).toUpperCase() + news.article.slice(1)
    );
    formData.append(
      "category",
      news.category.charAt(0).toUpperCase() + news.category.slice(1)
    );
    formData.append(
      "city",
      news.city.charAt(0).toUpperCase() + news.city.slice(1)
    );
    formData.append(
      "locality",
      news.locality.charAt(0).toUpperCase() + news.locality.slice(1)
    );

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:8080/reporters/addNews/${reporter.reporterId}`,
        formData,
        config
      )
      .then((res) => {
        console.log("form submit:" + res);
        history.push("/reporter");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const styles = {
    width: "100%",
  };
  return (
    <>
      <div data-testid="form" className={classes.layout}>
        <div className="my-div">
          <Typography variant="h5" gutterBottom>
            Add New Article
          </Typography>
          <form onSubmit={handleSubmit} action="">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  data-testid="title"
                  required
                  id="title"
                  name="title"
                  label="Heading/Title"
                  fullWidth
                  autoComplete="cc-name"
                  defaultValue={news.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel style={{ color: "GrayText", fontFamily: "arial" }}>
                  Article
                </InputLabel>
                <br />
                <TextareaAutosize
                  data-testid="article"
                  required
                  style={styles}
                  maxLength={450}
                  id="article"
                  name="article"
                  aria-label="Article"
                  placeholder="You can add only 450 words"
                  fullWidth
                  autoComplete="cc-number"
                  defaultValue={news.article}
                  onChange={handleInputChange}
                />
                <span className="counter">{count}/450</span>
                <hr />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  required
                  data-testid="category"
                  native
                  name="category"
                  inputProps={{
                    id: "outlined-age-native-simple",
                  }}
                  defaultValue={news.category}
                  onChange={handleInputChange}
                >
                  <option label="Choose Category" defaultValue="" />
                  <option defaultValue="business">Business</option>
                  <option defaultValue="cars">Cars</option>
                  <option defaultValue="entertainment">Entertainment</option>
                  <option defaultValue="family">Family</option>
                  <option defaultValue="health">Health</option>
                  <option defaultValue="politics">Politics</option>
                  <option defaultValue="religion">Religion</option>
                  <option defaultValue="science">Science</option>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel>Add Image for your News</InputLabel>
                <input
                  data-testid="image"
                  required
                  name="image"
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" className={classes.button}>
                    <AddPhotoAlternateIcon />
                  </Fab>
                </label>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  data-testid="city"
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="city"
                  defaultValue={news.city}
                  onChange={handleInputChange}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  data-testid="locality"
                  required
                  id="locality"
                  name="locality"
                  label="Locality"
                  fullWidth
                  autoComplete="cc-locality"
                  defaultValue={news.locality}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Button className={classes.button}>
                  <a className="back" href="/reporter">
                    Back
                  </a>
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}
export default UiForm;
