import React from 'react'
import  { useState ,useEffect,useContext,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import "./reporter.style.css"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Button} from '@material-ui/core'
import { color } from '@material-ui/system';
import {GetNews,GetNewsTop} from '../Service/GetNewsService'
import { ToastContainer, toast } from 'react-toastify';  
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { GetVideos } from '../Service/GetNewsService';
import { getFilteredNews } from './FilterNews';
import Link from '@material-ui/core/Link';
function Reporter() {

    const[news,setNews]=useState([])
    const[topNews,setTopNews]=useState([])
    const reporter=JSON.parse(sessionStorage.getItem('user'))
    const [readMore,setReadMore]=useState(false);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const[videos,setVideos]=useState([])
    const history=useHistory()

    function displayDiv(index)  {
      console.log(readMore)
      setReadMore({...readMore,[index]:!readMore[index]});
    };
    
    useEffect(() => {
      toast.success('Welcome '+reporter.userName)
      

        async function getData(){
          console.log("use effect")
          const videos=await GetVideos()
          console.log(videos.data)
          setVideos(videos.data)
          
          const news=await GetNews()
          console.log(news.data)
          setNews(news.data)
          
          console.log("use effect1")
        }
        async function getTop10(){
            console.log("use effect")
            
            const news=await GetNewsTop()
            console.log(news.data)
           setTopNews(news.data)
            
            console.log("use effect1")
          }
       
        getTop10()
        getData()
        
    
      }, [])
   
     function openModal(){
       history.push('/videoUpload')
     }
     
    function filterNews(){
      console.log(reporter)
      console.log(reporter.city)
      const filterNews=getFilteredNews(news,reporter.city)
      console.log(filterNews)
      setNews(filterNews)

     }
    return (

<div className="outerDiv">
  <div className="left">
     <h2>Headlines</h2>
     <h5>Latest Headlines</h5>
    
     {topNews.map(data=>(
          
           <>
           <div className="headline" style={{height:"60px"}}><a href="https://news.microsoft.com/june-2021-hybrid-work/">{data.article.slice(0,30)}...
                    
           </a></div><br/>
          
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
            <h2>Press Tools</h2>
            <div style={{height:"100px"}}>
            <Button color="primary" onClick={()=>{history.push('/addNews')}} >Upload News</Button>  <div className="time" style={{float:"right"}}>  {new Date().toLocaleString() + ""}</div>
            <Button onClick={openModal}> Upload Videos</Button>
            <br></br>
            <Link component="button" variant="body2" onClick={filterNews}>
                     See Your Local News
             </Link>
            </div>
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
