

export async function LoginService(data) {
  if(data.role==="Admin"){
    const response = await fetch('http://localhost:8080/admin/signin', {
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
  else if(data.role==="User"){

  }
     // Default options are marked with *
  const response = await fetch('http://localhost:8080/reporters/signin', {
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


