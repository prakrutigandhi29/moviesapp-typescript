import {useState,useEffect}from 'react'
import MoviesItem from './MoviesItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useParams} from 'react-router-dom'
type SearchProps={
    moviename:string
}

const Movies =(props:SearchProps)=>{

  const[articles,setArticles]=useState([]);
  const[page,setPage]=useState(1);
  const[loading,setLoading]=useState(true);
  const[totalResults,setTotalResults]=useState(0);
  //const movie=useParams(); 
  
  const updateMovies =async ()=>{
    let data= await fetch(`https://advanced-movie-search.p.rapidapi.com/search/movie?query=${props.moviename}&page=${page}`, {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
            "x-rapidapi-key": "2e417767famsh72341d57681a959p1a0df8jsnc20ce0aafab3"
        }
    })
    let parseData= await data.json();
    
    setArticles(parseData.results);
    setTotalResults(parseData.total_results);
    setLoading(false);
  }
  useEffect(()=>{
   
    updateMovies();
    //eslint-disable-next-line
  },[])
  
  const fetchMoreData = async() => {
    let data= await fetch(`https://advanced-movie-search.p.rapidapi.com/search/movie?query=${props.moviename}&page=${page+1}`, {
        "method": "GET",
        "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
            "x-rapidapi-key": "2e417767famsh72341d57681a959p1a0df8jsnc20ce0aafab3"
        }
    })
    setPage(page+1);
    let parseData= await data.json();
    setArticles(articles.concat(parseData.results))
    setTotalResults(parseData.total_results)
  };
    return (
      <div className="container my-3">
        
       
       {loading &&<Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}>
            <div className='container'>
              <div className='row'>
                {articles.map((element)=>{
                    return <div className='col md-4' key={element['overview']}>
                              <MoviesItem title={element['original_title']?element['original_title']:""} overview={element['overview']?element['overview']:""} imageUrl={element['poster_path']?element['poster_path']:"https://image.tmdb.org/t/p/original/29dCusd9PwHrbDqzxNG35WcpZpS.jpg"} rating={element['vote_average']?element['vote_average']:0}/>
                            </div>
                })}
              </div>
           </div>
          </InfiniteScroll>
                
     </div>

    
    )
  
}
export default Movies;