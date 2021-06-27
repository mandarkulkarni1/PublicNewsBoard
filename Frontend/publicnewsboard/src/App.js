import React from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter } from "react-router-dom";
import LoginContextProvider from "./components/Login/LoginContextProvider";
import Routes from "./components/Routes/Routes";
import ThemeContextProvider from "./components/context/ThemeContextProvider";
function App() {


  return (
    <React.Fragment>
      
      <BrowserRouter>
      <ThemeContextProvider>
          <Navbar />
         
          <Routes />
          </ThemeContextProvider>
      </BrowserRouter>
      
    </React.Fragment>
  );
}

export default App;
