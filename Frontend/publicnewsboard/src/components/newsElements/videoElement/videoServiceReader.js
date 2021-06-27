export async function GetVideos() {
    const data=await fetch('http://localhost:8080/readers/videos',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           }
    })
    return data.json()
}