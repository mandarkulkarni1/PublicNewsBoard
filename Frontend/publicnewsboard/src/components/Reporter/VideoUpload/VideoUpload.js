import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SweetAlert from "sweetalert2-react";
import { BsCameraVideo } from "react-icons/bs";
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #5bc0de",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ openModal }) {
  const classes = useStyles();
  const history = useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(openModal);
  const [FilePath, setFilePath] = useState("");
  const [title, setTitle] = useState("");
  const [Categories, setCategories] = useState("Film & Animation");
  const [city, setCity] = useState("");

  const [dialogue, setDialogue] = useState("");
  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.currentTarget.value);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      history.push("/login");
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();

    if (title === "" || city === "" || Categories === "" || FilePath === "") {
      return alert("Please first fill all the fields");
    }
    const token = sessionStorage.getItem("token");
    console.log(token);
    const reporter = JSON.parse(sessionStorage.getItem("reporter"));

    const variables = {
      reporterId: reporter.reporterId,
      title: title[0].toUpperCase() + title.slice(1),
      filePath: FilePath,
      category: Categories,
      city: city[0].toUpperCase() + city.slice(1),
    };
    console.log(variables);

    axios
      .post("http://localhost:8080/reporters/video", variables, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        if (response.data) {
          setDialogue(true);
          history.push("/reporter");
        } else {
          alert("Failed to upload video");
        }
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/reporter");
  };

  const Catogory = [
    { value: 0, label: "Economics" },
    { value: 0, label: "Cars" },
    { value: 0, label: "Entertainment" },
    { value: 0, label: "Health" },
    { value: 0, label: "Politics" },
    { value: 0, label: "Sports" },
    { value: 0, label: "Science" },
    // { value: 0, label: "Science" },
    { value: 0, label: "Others" },
  ];

  const onDrop = (files) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    let formData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data", token: token },
    };
    formData.append("file", files[0]);

    axios
      .post("http://localhost:8080/reporters/videoUpload", formData, config)
      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          
          setFilePath(response.data.filePath);

          //gerenate thumbnail with this filepath !
        } else {
          alert("failed to save the video in server");
        }
      });
  };

  const body = (
    <>
      <Fade in={open}>
        <div className={classes.paper}>
          <form onSubmit={onSubmit}>
            Add/Drop Video:<br/>
            <div className="text-center border border-info p-3 rounded">
                <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="text-center">
                      <input {...getInputProps()} />
                      <BsCameraVideo size="50px"/>
                    </div>
                  )}
                </Dropzone>
                
              
            </div>
            <div className="p-2">{FilePath}</div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={handleChangeTitle}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={handleChangeCity}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label for="">Category:</label>
                  <select
                    className="form-control"
                    value={Categories}
                    name="role"
                    onChange={handleChangeTwo}
                  >
                    {Catogory.map((item, index) => (
                      <option key={index} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger right" onClick={handleClose}>
                  Cancel
                </button>
                <button className="btn btn-info right" type="submit">
                  Add
                </button>
              </div>
            </div>
          </form>
          <SweetAlert
            show={dialogue}
            title="video upload"
            text="Successfully uploaded video"
            onConfirm={() => {
              setDialogue(false);
            }}
          />
        </div>
      </Fade>
      <Modal />
    </>
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {body}
      </Modal>
    </div>
  );
}
