export function getFilteredNews(data, filters) {
    if(!filters){
      return data
    }
    return data.filter((item) => item.city.toLowerCase()
    === filters.toLowerCase() );
  }

  export function getReporterNews(data, reporterId) {
   
    return data.filter((item) => item.reporterId
    === reporterId );
  }