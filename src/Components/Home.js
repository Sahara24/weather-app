import React, { useState } from "react";
export const Home = ({ setType }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      return;
    }
    const cityName = city[0].toUpperCase() + city.substring(1);
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=286f97aee2d116992ce709789f047e39`);
      if (res.ok) {
        const resdata = await res.json();
        setData(resdata)
        setType(resdata.weather[0].main)
        setCity('');
      } else {
        const err = await res.json();
        throw new Error(err.message || err.statusText);
      }
    }
    catch (err) {
      setError("City not found!")
    }

  }

  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input type="text" value={city} onChange={event => setCity(event.target.value)} placeholder="Enter location" />
        </form>
      </div>
      {
        Object.keys(data).length > 0 ? <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{data.main.temp.toFixed()}°F</h1>
            </div>
            <div className="description">
              <p>{data.weather[0].main}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind.speed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div> :
          <div><h2 align="center">{error}</h2></div>
      }
    </>
  )
}
