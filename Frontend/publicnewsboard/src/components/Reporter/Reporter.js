import React from 'react'
import { useHistory } from 'react-router-dom'
import "./reporter.style.css"
import { GetNews, GetNewsTop } from '../Service/GetNewsService'
import { ToastContainer, toast } from 'react-toastify';
import { GetVideos } from '../Service/GetNewsService';
import { getFilteredNews, getReporterNews } from './FilterNews';
import Link from '@material-ui/core/Link';
import { useState, useEffect } from 'react';
 import Video from '../newsElements/videoElement/Video'
 import Weather from './Weather'
 import ReporterNavbar from '../ReporterNavbar/NavBar'
function Reporter() {

  const [news, setNews] = useState([])
  const [topNews, setTopNews] = useState([])
  const [tempData, setTempData] = useState([])
  const reporter = JSON.parse(sessionStorage.getItem('reporter'))
  const token = sessionStorage.getItem("token")
  const [readMore, setReadMore] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [videos, setVideos] = useState([])
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const history = useHistory()
  function displayDiv(index) {
    setReadMore({ ...readMore, [index]: !readMore[index] });
  };

  useEffect(() => {
    if (!(sessionStorage.getItem('token'))) {
      history.push("/login")
    }

    else {
      toast.success("Welcome " + reporter.userName)
      async function getData() {
        const videos = await GetVideos()
        setVideos(videos.data)

        const n = await GetNews()
        setNews(n.data)
        setTempData(n.data)
      }
      async function getTop10() {
        const news = await GetNewsTop()
        setTopNews(news.data)
      }
      getTop10()
      getData()

    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
    }
    fetchData();
  });

  function openModal() {
    history.push('/videoUpload')
  }

  function filterNews(value){
    const filterNews=getFilteredNews(news,reporter.city)
    setNews(filterNews)
   

   }
   function seeAllNews(){
     setNews(tempData)
   }
   function seeReporterNews(value){
     const filterNews=getReporterNews(tempData,reporter.reporterId)
     setNews(filterNews)
     
   }
   function openArticle(newsId){
      history.push("/detailedNews/" + newsId)
   }
  return (
    <>
    <ReporterNavbar onChangeCity={filterNews} onChangeReporterNews={seeReporterNews} onChangeAllNews={seeAllNews}/>
    <div className="outerDiv">
      <div className="left">
      
        <div className="card rounded shadow">
          <br />
          <h4 className="text-center bg-white sticky-top">Headlines</h4><hr />
          {topNews.map(data => (
            <>
                <div className="headline" style={{height:"90px"}}><Link style={{cursor:"pointer"}} onClick={(e)=>{openArticle(data.newsId)}}>{data.article.slice(0,30)}...
                    
                    </Link></div><br/>
            </>
          ))}
        </div>
      </div>
      <div className="main">
        <h2 className="text-center sticky-top bg-white ">News</h2>

        {news.map((data, index) => (

          <div className="news rounded my-3">
            <h6 className="text-center">{data.category} </h6>
            <hr />
            <h4 className="title">{data.title}</h4>
            <hr />
            <img className="img" style={{ height: "200px" }} src={`http://localhost:8080/reporters/image/${data.image}`} alt="" />
            <hr />
            <div>{data.article.slice(0, 150)}...</div>
            {/* <a  onClick={displayDiv}><h2>view more</h2></a> */}
            <div>
              <a className="read-more-link" onClick={(e) => { displayDiv(index) }}>{readMore[index] ? 'Read Less' : 'Read More'}</a>
              {readMore[index] &&
                <div>
                  <p className="extra-content"  >
                    {data.article}
                  </p>
                </div>}
              <div> Place : {data.city}, {data.locality}</div>
              <div className="time"> Published On : {data.updatedAt.split('T')[0]} {data.updatedAt.split('T')[1]}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="right text-center">
      <div style={{height:"350px"}} className="headline">
        <div className="time" style={{float:"right"}}>  {new Date().toLocaleString() + ""}
           
         </div>
         <br></br>
         <hr></hr>
           {(typeof data.main != 'undefined') ? (
           <Weather weatherData={data}/>
            ): (
          <div></div>
         )}
        </div>
        <hr></hr>
        <div className="time shadow">
          <h4 className="text-center bg-white sticky-top p-1 ">Videos</h4>
          {videos.map((data) => (
            <React.Fragment>
               <div >
                    
                    <div style={{height:"200px"}} className="fakeimg">
                    <video style={{height:"200px"}} className="fakeimg" controls src={`http://localhost:8080/reporters/${data.video}`}></video>
                    </div>
                    <h4>{data.title}</h4>
                    <div>{data.city}</div>
                    <div className="time"> Published On : {data.createdAt.split('T')[0]} {data.createdAt.split('T')[1]}</div>
                    <hr></hr>
                </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
    </>

  )
}

export default Reporter
