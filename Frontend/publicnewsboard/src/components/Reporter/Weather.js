import React from 'react';
import './weather.style.css'
import moment from 'moment';

const CardExampleCard = ({weatherData}) => (
    <div className="weather">


      <p className="head">{weatherData.name}</p>
      <div className="flex">
        <p className="day">{moment().format('dddd')}, {moment().format('LL')}</p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>

      <div className="flex">
        <p className="temp">Temp: {weatherData.main.temp} &deg;C</p>
        <p className="temp"> Humid: {weatherData.main.humidity} %</p>
      </div>
      
      


    <div className="flex">
      <p className="sunrise-sunset">Sunrise {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
      <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
    </div>
  
</div>
    

)

export default CardExampleCard;