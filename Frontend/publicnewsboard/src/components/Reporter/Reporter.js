import React from 'react'
import {useHistory} from 'react-router-dom'
import "./reporter.style.css"
import {Button} from '@material-ui/core'
import {GetNews,GetNewsTop} from '../Service/GetNewsService'
import { ToastContainer, toast } from 'react-toastify';  
import { GetVideos } from '../Service/GetNewsService';
import { getFilteredNews, getReporterNews } from './FilterNews';
import Link from '@material-ui/core/Link';
import{useState ,useEffect} from 'react';
function Reporter() {

    const[news,setNews]=useState([])
    const[topNews,setTopNews]=useState([])
    const[tempData,setTempData]=useState([])
    const reporter=JSON.parse(sessionStorage.getItem('reporter'))
    const token=sessionStorage.getItem("token")
    const [readMore,setReadMore]=useState(false);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const[videos,setVideos]=useState([])
    const history=useHistory()
    function displayDiv(index)  {
      setReadMore({...readMore,[index]:!readMore[index]});
    };
    
    useEffect(() => {
      if(!(sessionStorage.getItem('token'))){
        history.push("/login")
      }
       
      else{
        toast.success("Welcome "+reporter.userName)
        async function getData(){
          const videos=await GetVideos()
          setVideos(videos.data) 

          const n=await GetNews()
          setNews(n.data)
          setTempData(n.data)
        }
        async function getTop10(){    
            const news=await GetNewsTop()
           setTopNews(news.data)
          }
        getTop10()
        getData()
      
        }
      }, [])
   
     function openModal(){
       history.push('/videoUpload')
     }
     
    function filterNews(){
      const filterNews=getFilteredNews(news,reporter.city)
      console.log("local"+filterNews)
      setNews(filterNews)
     

     }
     function seeAllNews(){
      console.log("full news"+tempData)
       setNews(tempData)
     }
     function seeReporterNews(){
       const filterNews=getReporterNews(tempData,reporter.reporterId)
       console.log("on id "+filterNews)
       setNews(filterNews)
       
     }
     function openArticle(newsId){
        history.push('/articlePage/'+newsId)
     }
    return (

<div className="outerDiv">
  <div className="left">

         <div className="headline">
            <h4>Press Tools</h4>
            <div style={{height:"200px"}}>
            <Button color="primary" onClick={()=>{history.push('/addNews')}} >Upload News</Button> 
            <Button onClick={openModal}> Upload Videos</Button>
            <br></br>
            <Link component="button" variant="body2" onClick={filterNews}>
                     See Local News
             </Link>
           
             <Link component="button" variant="body2" onClick={seeReporterNews} >
                     See Your News
             </Link>
             
              <Link component="button" variant="body2" onClick={seeAllNews} >
                     See All News
             </Link> 
             
            </div>
            </div>
     <hr></hr>
     
     <h5>Latest Headlines</h5>
    
     {topNews.map(data=>(
          
           <>
           <div className="headline" style={{height:"80px"}}><Link style={{cursor:"pointer"}} onClick={(e)=>{openArticle(data.newsId)}}>{data.article.slice(0,30)}...
                    
           </Link></div><br/>
          
          </>
     ))}



    
  </div>
  <div className="main">
       <h2>News</h2>
        
          {news.map((data,index)=>(
            
            <div className="news">
            <h2 className="title">{data.title}</h2>
            <h3>{data.category} </h3>
            <div className="time"> Published On : {data.updatedAt.split('T')[0]} {data.updatedAt.split('T')[1]}</div>
            <div className="img" style={{height:"200px"}}><img className="img" style={{height:"200px"}} src={`http://localhost:8080/reporters/image/${data.image}`} alt=""></img></div>
            <p> Place : {data.city},{data.locality}</p>                                
            <div>{data.article.slice(0,150)}...</div>
            {/* <a  onClick={displayDiv}><h2>view more</h2></a> */}
            <div>
          
            <a className="read-more-link" onClick={(e)=>{displayDiv(index)}}>{readMore[index]?'Read Less':'Read More'}</a>
                  {readMore[index] && 
                      <div>
                        <p className="extra-content"  >
                        {data.article}
                        </p>
                      </div>}
            
            </div>
            
          
   </div>
 ))}
  </div>
  <div className="right">
        
        <div className="time" style={{float:"right"}}>  {new Date().toLocaleString() + ""}
           
        </div>
        <h4>Videos</h4>
        <div> 
            {videos.map((data)=>(
                <div >
                    
                    <div style={{height:"200px"}} className="fakeimg">
                    <video style={{height:"200px"}} className="fakeimg" controls src={`http://localhost:8080/reporters/${data.video}`}></video>
                    </div>
                    <h4>{data.title}</h4>
                    <div>{data.city}</div>
                    <div className="time"> Published On : {data.createdAt.split('T')[0]} {data.createdAt.split('T')[1]}</div>
                    <hr></hr>
                </div>
            ))}
       <div> 
            <h4>Top Stories</h4>
            <div className="fakeimg" style={{height:"200px"}}>Image</div>
            <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
            </div>
    </div>
    </div>
  <ToastContainer/>
</div>

    )
}

export default Reporter
