import React from 'react';
import FavNews from './components/newsElements/favNews';
import Navbar from './components/navbar/navbar';


function App() {
  return (
    <React.Fragment>
    <Navbar/>
    <FavNews/>
    </React.Fragment>
  );
}

export default App;
