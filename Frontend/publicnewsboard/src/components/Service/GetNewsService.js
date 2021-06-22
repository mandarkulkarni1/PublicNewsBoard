

export async function GetNews() {
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/readers/news',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    console.log(data)
    return data.json()

}

export async function GetNewsTop() {
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/readers/news/top10',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    console.log(data)
    return data.json()

}

export async function GetVideos() {
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/reporters/videos',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    console.log(data)
    return data.json()

}



