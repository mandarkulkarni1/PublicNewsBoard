import React, { useState, useEffect } from "react";
import { getWeather } from "./weatherService";
import { FaTemperatureHigh } from "react-icons/fa";
const WeatherComponent = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    async function getWtr() {
      const weather = await getWeather();
      setState(weather);
    }
    getWtr();
  }, []);
  return (
    <React.Fragment>
      It's {state.temp} &deg;C at Pune <FaTemperatureHigh />
    </React.Fragment>
  );
};

export default WeatherComponent;
