import './App.css';
import {BrowserRouter as Router,Route, Routes,Link} from "react-router-dom";
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import MovieSearch from './components/MovieSearch';
import { useState } from 'react';

function App() {
  const [movie,SetMovie]=useState("");
    const changeHandler=(event)=>{
    SetMovie(event.target.value)
  }
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <form className="form-inline my-5 my-lg-0">
        <input className="form-control mr-sm-2 my-10" type="search" placeholder="Search" name="moviename" onChange={changeHandler} />
        <Link to='/find'> <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>
        </form>
       
        <div className='container my-5'>
        <Routes>
          <Route  path="/" element={<Movies key="family" genre={10751}  />}/>
          <Route  path="/action" element={<Movies key="action" genre={28}  />}/>
          <Route  path="/drama"  element={<Movies key="drama" genre={18} />}/>
          <Route  path="/comedy" element={<Movies key="comedy" genre={35} />}/>
          <Route  path="/romance" element={<Movies key="romance" genre={10749} />}/>
          <Route  path="/horror" element={<Movies key="horror" genre={27} />}/>
          <Route  path="/find" element={<MovieSearch moviename={movie} key='moviesearch'/>}/>
      </Routes>
      </div>
      </Router>

     </div>
  );
}

export default App;
