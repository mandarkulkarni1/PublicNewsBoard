

export async function RegisterService(data) {
    // Default options are marked with *
 const response = await fetch('http://localhost:8080/reporters/signup', {
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


