import axios from 'axios'

export async function NewsImageService(data) {
    const formData = new FormData();

    formData.append('photo', data);
    console.log(formData)
    const config={
        headers:{
            'content-type':'multipart/form-data'
        }
    }
    axios
      .post('http://localhost:8080/reporters/imageUpload',formData,config)
        .then((res)=>{
            return res.json();
        })
    // Default options are marked with *
//  const response = await fetch('http://localhost:8080/reporters/imageUpload', {
//    method: 'POST', // *GET, POST, PUT, DELETE, etc.
//      // no-cors, *cors, same-origin
  
//    headers: {
//      'Content-Type': 'application/json'
//      // 'Content-Type': 'application/x-www-form-urlencoded',
//    },
   
//    body:JSON.stringify({'photo':formData}) // body data type must match "Content-Type" header
//  });

}


