import React, {  useState } from "react";
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
import "./AddNews.styles.css";
import { useHistory } from "react-router";
import axios from "axios";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Fab from "@material-ui/core/Fab";
import Swal from 'sweetalert2'


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
 const styles = {
    width: "100%",
  };
// Add news Function Component
function AddNews() {

  const classes = useStyles();
  const history = useHistory();

  // State use to store form data
  const [news, setNews] = useState({
    title: "",
    city: "",
    locality: "",
    category: "",
    article: "",
    image: [null],
  });


  //State for Word counter for counting artical words
  //{ content, wordCount }
  const [{ content, wordCount }, setContent] = useState({
    content: news.article,
    wordCount: 0
  });
//Handling onChange Event
  function handleInputChange(e) {

    //only for counting words in article
    if (e.target.name === "article") {
      const limit=450;
      let words = (e.target.value).split(' ').filter(Boolean);
      if (words.length > limit) {
        Swal.fire("Word limit is Over")
        setContent({
          content: words.slice(0, limit).join(' '),
          wordCount: limit
        });
      } else {
        setContent({ content: e.target.value, wordCount: words.length });
      }
    }
    setNews({
      ...news,
      [e.target.name]: e.target.value,
    });
  }

  //Handling Image file
  const handleUploadClick = (e) => {
    setNews({
      ...news,
      [e.target.name]: e.target.files[0],
    });
  };

  //handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(news);

   
    //appending image file and other data
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

    // geting repoter info and token from session
    const reporter = JSON.parse(sessionStorage.getItem("reporter"));
    const token = sessionStorage.getItem("token");

// posting data to add new news
    const config = {
      headers: {
        "content-type": "multipart/form-data",
       "token":token
      },
    };

    axios
      .post(
        `http://localhost:8080/reporters/addNews/${reporter.reporterId}`,
        formData,
        config
      )
      .then((res) => {
        Swal.fire("News Article Added Successfully")
        history.push("/reporter");
      })
      .catch((error) => {
        console.log(error);
      });
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
                  style={styles}
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
                  // maxLength={450}
                  id="article"
                  name="article"
                  aria-label="Article"
                  placeholder="You can add only 450 words"
                  defaultValue={news.article}
                  onChange={handleInputChange}
                />
                <span className="counter">{wordCount}/450</span>
                <hr />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  required
                  style={styles}
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
                  style={styles}
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
                  style={styles}
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
export default AddNews;
