import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {useEffect} from 'react'
import { Button } from "@material-ui/core";
import axios from 'axios'
import {useState,useContext} from 'react'
import Dropzone from 'react-dropzone';
import {TextField} from '@material-ui/core'
import { Input } from "@material-ui/core";
import {useHistory} from 'react-router-dom'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));


export default function SimpleModal({openModal}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(openModal);
  const [FilePath, setFilePath] = useState("")
  const history=useHistory()
  const [title, setTitle] = useState("");
  const [Categories, setCategories] = useState("Film & Animation")
  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value)
}

const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value)
}

const onSubmit = (event) => {

  event.preventDefault();


  if (title === "" || 
      Categories === "" || FilePath === "" 
     ) {
      return alert('Please first fill all the fields')
  }
 
  const id=1;
  const variables = {
      reporterId: id,
      title: title,
      filePath: FilePath,
      category: Categories,
    
  }
  // console.log(variables)

  axios.post('http://localhost:8080/reporters/video', variables)
      .then(response => {
          if (response.data) {
              alert('video Uploaded Successfully')
               history.push('/reporter')
             
          } else {
              alert('Failed to upload video')
          }
      })

}
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]


const onDrop = ( files ) => {

  let formData = new FormData();
  const config = {
      header: { 'content-type': 'multipart/form-data' }
  }
  console.log(files)
  formData.append("file", files[0])

  axios.post('http://localhost:8080/reporters/videoUpload', formData, config)
  .then(response=> {
      if(response.data.success){

          let variable = {
              filePath: response.data.filePath,
              fileName: response.data.fileName
          }
          setFilePath(response.data.filePath)

          //gerenate thumbnail with this filepath ! 
          
      } else {
          alert('failed to save the video in server')
      }
  })

}

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form  >
            
            {/* <label>Select product image</label>
            <input onChange={handleInputChange} type="file" class="form-control" accept="image/*"/>
            <button type="submit">Upload</button>
            <img src="http://localhost:8080/reporters/image/99a58a2d3ba2d010b06f4588051270fe" alt=""></img> */}
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Dropzone 
                      onDrop={onDrop}
                      multiple={false}
                      maxSize={800000000}>
                      {({ getRootProps, getInputProps }) => (
                          <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              {...getRootProps()}
                          >
                              <input {...getInputProps()} />
                              Upload Videos
  
                          </div>
                      )}
                  </Dropzone>
                
              </div>

              <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />

                <select onChange={handleChangeTwo}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>
          </form>
      <button type="button" onClick={handleClose}>
        onClose
      </button>
      <SimpleModal />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
