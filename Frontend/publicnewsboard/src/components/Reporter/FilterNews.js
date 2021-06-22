export function getFilteredNews(data, filters) {
   
    return data.filter((item) => item.city.toLowerCase()
    === filters.toLowerCase() );
  }