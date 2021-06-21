import React, { useContext, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import NewsContext from "../../context/NewsContext";
import axios from "axios";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useHistory } from "react-router";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign:'center'
  },
}));

export default function SimpleModal({open}) {
  const classes = useStyles();
  const history=useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
//  const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  const [file, setFile] = useState(null);
  const { newsId } = useContext(NewsContext);

  const fileSelectHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    // console.log(formData,file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:8080/reporters/uploadImage/${newsId}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

      history.push('/reporter');
  };

  const fileInput = useRef();
  const onButtonClick = () => {
    fileInput.current.click();
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">
            <h3>Add Image for your news</h3>
            <input
              style={{ display: "none" }}
              name="image"
              type="file"
              accept="image/*"
              multiple={false}
              onChange={fileSelectHandler}
              ref={fileInput}
            />
            <Button variant="contained" color="primary" onClick={onButtonClick}>
              <AddPhotoAlternateIcon />
            </Button>
          </label>
        </div>
        <div>
          <br />
          <Button
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            color="secondary"
            type="submit"
          >
            Upload
          </Button>
        </div>
      </form>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
