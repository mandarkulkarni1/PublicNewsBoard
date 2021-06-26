  export async function fetchData(news) {
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/readers/news/expandedNews/'+news,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    console.log(data);
    return data.json();
}