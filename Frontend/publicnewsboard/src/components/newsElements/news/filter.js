const filterUtil=function (data,value){
    if(!value || value==='ALL'){
      return data;
    }
    return data.filter((data)=>data.category === value);
  }

export default filterUtil;