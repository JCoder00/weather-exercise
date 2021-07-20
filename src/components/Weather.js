import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styling/weather.scss';

const Weather = () => {
  const [suggested_london, updateSuggestedLondon] = useState('');
  const [suggested_paris, updateSuggestedParis] = useState('');
  const [suggested_rome, updateSuggestedRome] = useState('');
  const [suggested_berlin, updateSuggestedBerlin] = useState('');

  useEffect(() => {
    const getSuggested = (city, updateCity) => {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
        updateCity(res.data.list[0].weather[0].description);
      }).catch(error => console.error(error));
    }

    getSuggested("london", updateSuggestedLondon);
    getSuggested("paris", updateSuggestedParis);
    getSuggested("rome", updateSuggestedRome);
    getSuggested("berlin", updateSuggestedBerlin);
  }, []);
  
  const [weather, updateWeather] = useState(null);
  const [searched_city, updateSearchedCity] = useState('London');

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searched_city}&cnt=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => {
      let forecast = []
      for (let i = 0; i < res.data.list.length; i++) {
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
      <br />
      <br />
      Suggested cities:
      <br />
      <div className="cities">
        <div className="city">
          <h2>London</h2>
          <p className="desc">{suggested_london}</p>
        </div>
        <div className="city">
          <h2>Paris</h2>
          <p className="desc">{suggested_paris}</p>
        </div>
        <div className="city">
          <h2>Rome</h2>
          <p className="desc">{suggested_rome}</p>
        </div>
        <div className="city">
          <h2>Berlin</h2>
          <p className="desc">{suggested_berlin}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
