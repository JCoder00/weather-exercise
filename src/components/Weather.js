import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styling/weather.scss';

const Weather = () => {
  const [weather, updateWeather] = useState(null);
  const [searched_city="London", updateSearchedCity] = useState('');

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searched_city}&cnt=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      let forecast = []
      for (let i = 0; i < res.data.list.length; i++) {
        console.log(res.data.list[i].weather[0].description);
        forecast.push(res.data.list[i].weather[0].description);
      }
      updateWeather(forecast);
    }).catch(error => console.error(error))
  }, [searched_city])

  return (
    <div data-testid="weather" className="weather">
      <input type="text" id="city-input"></input>
      <input type="button" value="Submit" onClick={() => updateSearchedCity(document.getElementById("city-input").value)}></input>
      Weather:
      <br />
      The weather in {searched_city} for the next 5 days is: {weather ? weather.join(', ') : ''}
    </div>
  );
}

export default Weather;
