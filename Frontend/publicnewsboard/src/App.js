import React from 'react';
import FavNews from './components/newsElements/favNews/favNews';
import Navbar from './components/navbar/navbar';
import News from './components/newsElements/news/news';
import { BrowserRouter, Route, Switch,Link } from "react-router-dom";
import LoginContextProvider from './components/Login/LoginContextProvider';
import LoginRegisterPage from './components/Login/LoginRegisterPage';
import Reporter from './components/Reporter/Reporter'

function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <FavNews/>
    <News/>
    <BrowserRouter>
       <LoginContextProvider>
          <Switch>
            <Route path="/login">
                <LoginRegisterPage/>
            </Route>
            <Route path="/reporter">
                  <Reporter/>
             </Route>

           </Switch>
       </LoginContextProvider>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
