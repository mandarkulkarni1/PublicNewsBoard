

export async function GetNews() {
    const token=sessionStorage.getItem("token")
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/reporters/news',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token':token
           }
    })
    console.log(data)
    return data.json()

}

export async function GetNewsTop() {
    const token=sessionStorage.getItem("token")
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/reporters/news/top10',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token':token
           }
    })
    console.log(data)
    return data.json()

}

export async function GetVideos() {
    const token=sessionStorage.getItem("token")
    // Default options are marked with *
    const data=await fetch('http://localhost:8080/reporters/videos',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token':token
           }
    })
    console.log(data)
    return data.json()
}


export async function GetArticle(params) {
    const token=sessionStorage.getItem("token")
    // Default options are marked with *
    const data=await fetch("http://localhost:8080/reporters/getArticle/" + params.id,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'token':token
           }
    })
    console.log(data)
    return data.json()

}


