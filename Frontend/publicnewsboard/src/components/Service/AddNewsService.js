
export async function AddNewsService(data) {
    // Default options are marked with *
 const reporter = JSON.parse(sessionStorage.getItem("user"));

 const response = await fetch(`http://localhost:8080/reporters/addNews/${reporter.reporterId}`, {
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
     // no-cors, *cors, same-origin
  
   headers: {
     'Content-Type': 'application/json'
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },
   
   body: JSON.stringify(data) // body data type must match "Content-Type" header
 });
 return response.json();
}
