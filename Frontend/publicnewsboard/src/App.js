import React from 'react';
import FavNews from './components/newsElements/favNews/favNews';
import Navbar from './components/navbar/navbar';
import News from './components/newsElements/news/news';


function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <FavNews/>
    <News/>
    </React.Fragment>
  );
}

export default App;
