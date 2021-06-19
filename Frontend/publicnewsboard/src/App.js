import React from "react";
import Navbar from "./components/navbar/navbar";

import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./components/Login/LoginContextProvider";
import Routes from "./components/Routes/Routes";
function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <LoginContextProvider>
          <Navbar />
         
          <Routes />
        </LoginContextProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
