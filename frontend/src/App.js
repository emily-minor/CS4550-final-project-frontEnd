import React from 'react';
import './App.css';
import Homepage from './cats/homepage/homepage';
import Profile from './cats/profile/profile';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from "react-router";
import Login from './cats/login/login';
import Search from './cats/search/search';
import Details from './cats/details/details';
import Navigation from './cats/navigation';

function App() {
  return(
    <div className="container">
    <BrowserRouter>
      <Navigation/>
        <Routes>
          <Route index
            element={<Homepage/>}/>
          <Route path="/profile"
            element={<Profile/>}/>
          <Route path="/login"
            element={<Login/>}/>
          <Route path="/search"
            element={<Search/>}/>
          <Route path="/details"
            element={<Details/>}/>
        </Routes>
      </BrowserRouter>
      </div> 
    // <div className="container">
    //   <Homepage/>
    //   <Profile/>
    // </div>
  )
}

export default App;
