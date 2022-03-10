type ItemProps={
    title:string,
    overview:string,
    imageUrl:string,
    rating:number
}
const NewsItem =(props:ItemProps)=> {
  
    let {title,overview,imageUrl,rating}=props
    return (
     
      <div className="container mx-1 my-1">
            <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={imageUrl} alt="hello"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{overview}</p>
                    <button className="btn btn-primary"> Rating - {rating}</button>
                </div>
            </div>
      </div>
    )
  
}
export default NewsItem