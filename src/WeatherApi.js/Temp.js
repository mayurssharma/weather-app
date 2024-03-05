import React, { useState, useEffect } from "react";
import "./Style.css";
import WeatherCard from "./WeatherCard";

function Temp() {
  const [searchValue, setsearchValue] = useState("Mumbai");
  const [temp, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=e1985233a20851c7116e4265bd6a0b5e`;
      const response = await fetch(url);
      const data = await response.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setsearchValue("");
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
    setsearchValue("");
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTeam"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={temp} />
    </>
  );
}

export default Temp;
