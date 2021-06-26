
import React from "react";
import { Component } from "react";
import {useParams} from 'react-router-dom'
import Link from '@material-ui/core/Link';
import{useState ,useEffect} from 'react'
import axios from 'axios'
import{GetArticle} from '../Service/GetNewsService'
function ArticlePage() {
   
    const[article,setArticle]=useState([])
    const params = useParams();
    useEffect(()=>{
        async function getArticle(){
            const article=await GetArticle(params)
            setArticle(article.data[0]) 
          
          }
          getArticle()
    },[])
   
    return (
        <>
         <div className="my-3">
        <div className="container" style={{ width: "80" }}>
          <div className="mx-5">
            <h1>{article.title}</h1>
            <div className="row">
              <div className="col-sm-6">
                <span className="text-secondary mx-1 mt-n1 h6">
                  {article.locality}
                </span>
                <br />
                <span className="text-secondary mx-1 h6">
                  Published On : {article.createdAt}
                </span>
                <br/>
                <span className="text-secondary mx-1 h6">
                  Category : {article.category}
                </span>
              </div>
              <div className="col-sm-6">
                {" "}
                <span>&nbsp; &nbsp;</span>
                <div
                  className="modal fade"
                  id="exampleModalLong"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLongTitle"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
            <br />
            <img style={{ maxWidth: "100%" ,height: "400px"}}
              src={`http://localhost:8080/reporters/image/${article.image}`}
              alt=""
            />
            <br />
            <br />
            <div style={{ width: "85%" }}>
              {" "}
              <span style={{ fontSize: "100%" }}>{article.article}</span>
            </div>
            <br />
            Reprted By : - Taslima nasreen
            <br />
            <br />
          </div>
        </div>
      </div>
        </>
    )
}

export default ArticlePage

