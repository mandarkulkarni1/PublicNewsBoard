export async function LoginService(data) {
  
  if (data.role === "Admin") {
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
  else if (data.role === "Reader") {
    console.log(data+'------------------------------------------------');
    const response = await fetch('http://localhost:8080/readers/signin', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();

  }
  // Default options are marked with *
  else {
    console.log(data+'------------------------------------------------');
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
}


