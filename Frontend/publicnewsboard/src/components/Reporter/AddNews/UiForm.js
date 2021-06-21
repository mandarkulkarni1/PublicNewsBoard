import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { TextareaAutosize, Select, Button } from "@material-ui/core";
import "./Form.styles.css";
import { useHistory } from "react-router";
import NewsContext from "../../context/NewsContext";
import axios from "axios";
import { AddNewsService } from "../../Service/AddNewsService";

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
}));

function UiForm() {
  const classes = useStyles();
  const history = useHistory();
  const { setNewsId } = useContext(NewsContext);

  const [formData, setFormData] = useState({
    title: "",
    city: "",
    locality: "",
    category: "",
    article: "",
  });

  const reporter = JSON.parse(sessionStorage.getItem("user"));

  // console.log(reporter)

  const [count, setCount] = useState(0);
  function handleInputChange(e) {
    //console.log(e.target.value)
    if (e.target.name === "article") {
      setCount(e.target.value.length);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // AddNewsService(formData).then((res) => {
    
    //     console.log(res);

    // });
    axios
      .post(`http://localhost:8080/reporters/addNews/${reporter.reporterId}`, formData)
      .then((res) => {
        console.log("form submit:"+   res);
        // setNewsId(res.data);
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
      <div className={classes.layout}>
        <div className="my-div">
          <Typography variant="h5" gutterBottom>
            Add New Article
          </Typography>
          <form onSubmit={handleSubmit} action="">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Heading/Title"
                  fullWidth
                  autoComplete="cc-name"
                  defaultValue={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <label style={{ color: "GrayText", fontFamily: "arial" }}>
                  Article
                </label>
                <br />
                <TextareaAutosize
                  required
                  style={styles}
                  maxLength={450}
                  id="article"
                  name="article"
                  aria-label="Article"
                  placeholder="You can add only 450 words"
                  fullWidth
                  autoComplete="cc-number"
                  defaultValue={formData.article}
                  onChange={handleInputChange}
                />
                <span className="counter">{count}/450</span>
                <hr />
              </Grid>
              <Grid item xs={12} md={12}>
                <Select
                  native
                  name="category"
                  inputProps={{
                    id: "outlined-age-native-simple",
                  }}
                  defaultValue={formData.category}
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
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="city"
                  defaultValue={formData.city}
                  onChange={handleInputChange}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="locality"
                  name="locality"
                  label="Locality"
                  fullWidth
                  autoComplete="cc-locality"
                  defaultValue={formData.locality}
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
