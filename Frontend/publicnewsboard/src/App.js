import React from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import ThemeContextProvider from "./components/context/ThemeContextProvider";
import { ErrorBoundry } from "./components/ErroryBoundry";
function App() {


  return (
    <React.Fragment>

      <BrowserRouter>
        <ThemeContextProvider>
          <ErrorBoundry>
          <Navbar />

          <Routes />
          </ErrorBoundry>
        </ThemeContextProvider>
      </BrowserRouter>

    </React.Fragment>
  );
}

export default App;
