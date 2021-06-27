export async function getWeather() {
    const data=await fetch('http://localhost:8080/readers/weather',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
           }
    })
    return data.json()
}