import {useState,useEffect}from 'react'
import MoviesItem from './MoviesItem'
import Spinner from './Spinner'
import ReactPaginate from 'react-paginate';
type MoviesProps={
    genre:number,
}
const News =(props:MoviesProps)=>{

  const[articles,setArticles]=useState([]);
  const[page,setPage]=useState(1);
  const[loading,setLoading]=useState(true);
  const[pageCount,setPageCount]=useState(0);
  const updateMovies =async ()=>{
    let data= await fetch(`https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=${props.genre}&page=${page}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
		"x-rapidapi-key": "2e417767famsh72341d57681a959p1a0df8jsnc20ce0aafab3"
	}
})
    let parseData= await data.json();
    setArticles(parseData.results);
    setPageCount(parseData.total_pages)
    setLoading(false);
  }
  useEffect(()=>{
   
    updateMovies();
    //eslint-disable-next-line
  },[])
  
  const fetchMoreData = async(data) => {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });
    let moviedata= await fetch(`https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=${props.genre}&page=${page+1}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "advanced-movie-search.p.rapidapi.com",
		"x-rapidapi-key": "2e417767famsh72341d57681a959p1a0df8jsnc20ce0aafab3"
	}
})
    setPage(data.selected+1);
    let parseData= await moviedata.json();
    setArticles(parseData.results)
    setPageCount(parseData.total_pages)
   
  };
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "75px 0px"}}> Top Movies</h1>
       {loading &&<Spinner/>}
       <div className='container'>
              <div className='row'>
                {articles.map((element)=>{
                    return <div className='col md-4' key={element['poster_path']}>
                              <MoviesItem title={element['original_title']?element['original_title']:""} overview={element['overview']?element['overview']:""} imageUrl={element['poster_path']?element['poster_path']:"https://images.hindustantimes.com/img/2022/02/09/1600x900/gavaskar-rohit-india_1644421814546_1644421819878.jpg"} rating={element['vote_average']?element['vote_average']:0}/>
                            </div>
                })}
              </div>
           </div> 
       <ReactPaginate
       previousLabel={'Previous'}
       nextLabel={'Next'}
       breakLabel={'...'}
       pageCount={pageCount}
       marginPagesDisplayed={2}
       pageRangeDisplayed={3}
       onPageChange={fetchMoreData}
       containerClassName={'pagination justify-content-center'}
       pageClassName={'page-item'}
       pageLinkClassName={'page-link'}
       previousClassName='page-item'
       previousLinkClassName='page-link'
       nextClassName='page-item'
       nextLinkClassName='page-link'
       breakClassName='page-item'
       breakLinkClassName='page-link'
       activeClassName='active'
    
       />
      
       
     </div>

    
    )
  
}
export default News;