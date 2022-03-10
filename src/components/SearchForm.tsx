import { useState } from 'react';
import {Link} from 'react-router-dom'

export const SearchForm=()=>{
    const [movie,SetMovie]=useState("");
    const changeHandler=(event)=>{
    SetMovie(event.target.value)
  }
    return(
        <form className="form-inline my-5 my-lg-0">
        <input className="form-control mr-sm-2 my-10" type="search" placeholder="Search" name="moviename" onChange={changeHandler} />
        <Link to={{
                  pathname:`/find/${movie}`}}> <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>
        </form>
       
    )
}