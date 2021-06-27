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
function Reporter() {

  const [news, setNews] = useState([])
  const [topNews, setTopNews] = useState([])
  const [tempData, setTempData] = useState([])
  const reporter = JSON.parse(sessionStorage.getItem('reporter'))
  const token = sessionStorage.getItem("token")
  const [readMore, setReadMore] = useState(false);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [videos, setVideos] = useState([])
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

  function openModal() {
    history.push('/videoUpload')
  }

  function filterNews() {
    const filterNews = getFilteredNews(news, reporter.city)
    console.log("local" + filterNews)
    setNews(filterNews)


  }
  function seeAllNews() {
    console.log("full news" + tempData)
    setNews(tempData)
  }
  function seeReporterNews() {
    const filterNews = getReporterNews(tempData, reporter.reporterId)
    console.log("on id " + filterNews)
    setNews(filterNews)

  }
  function openArticle(newsId) {
    history.push('/articlePage/' + newsId)
  }
  return (

    <div className="outerDiv">
      <div className="left">
        <div className="p-2 text-center rounded shadow">
          <h4 className="">Press Tools</h4><hr />
          <div className="text-center">
            <button className="btn btn-info text-center my-1" color="primary" onClick={() => { history.push('/addNews') }} >Upload News</button>
            <button className="btn btn-info text-center my-1" onClick={openModal}>Upload Video</button>
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
        <br />

        <div className="card rounded shadow">
          <br />
          <h4 className="text-center bg-white sticky-top">Headlines</h4><hr />
          {topNews.map(data => (
            <>
              <div className="p-2" style={{ cursor: "pointer" }} >
                <Link onClick={(e) => { openArticle(data.newsId) }} />
                {data.article.slice(0, 30)}...
              </div>
              <hr />
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
        <div className="time shadow">
          <h4 className="text-center bg-white sticky-top p-1 ">Videos</h4>
          {videos.map((data) => (
            <React.Fragment>
              <Video video={data}></Video>
              <div>{data.title}</div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Reporter
