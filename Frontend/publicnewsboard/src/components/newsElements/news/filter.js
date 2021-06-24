const filterUtil=function (data,value){
    data.map((news)=>console.log(news.title));
    if(!value){
      return data;
    }

    // data.filter((data)=>data.category === filter);
    return data.filter((data)=>data.category === value);
  }

export default filterUtil;