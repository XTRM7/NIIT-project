import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { ReactDOM } from "react";
import ReactAnimatedWeather from "react-animated-weather";

import Haze_weather from "../src/assets/Haze_weather.jpg";
import Clear_weather from "../src/assets/Clear_weather.jpg";
import Dazzle_weather from "../src/assets/Dazzle_weather.jpg";
import Cloud_weather from "../src/assets/Cloud_weather.jpg";
import Fog_weather from "../src/assets/Fog_weather.jpg";
import Mist_weather from "../src/assets/Mist_weather.jpg";
import Rain_weather from "../src/assets/Rain_weather.jpg";
import Smoke_weather from "../src/assets/Smoke_weather.jpg";
import Snow_weather from "../src/assets/Snow_weather.jpg";
import Thunderstorm_weather from "../src/assets/Thunderstorm_weather.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6117dc0081ee562ae393f62faa48f67a`;

  const defaults = {
    icon: "",
    color: "white",
    size: 70,
    animate: true,
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  };
  setInterval(updateTime, 1000);

  const currentWeatherText = data.weather ? data.weather[0].main : "";
  let recorded_weather;

  switch (currentWeatherText) {
    case 'Clear':
      recorded_weather = Clear_weather;
      break;
    case 'Dazzle':
      recorded_weather = Dazzle_weather;
      break;
    case 'Clouds':
      recorded_weather = Cloud_weather;
      break;
    case 'Fog':
      recorded_weather = Fog_weather;
      break;
    case 'Mist':
      recorded_weather = Mist_weather;
      break;
    case 'Rain':
      recorded_weather = Rain_weather;
      break;
    case 'Smoke':
      recorded_weather = Smoke_weather;
      break;
    case 'Snow':
      recorded_weather = Snow_weather;
      break;
    case 'Thunderstorm':
      recorded_weather = Thunderstorm_weather;
      break;
    case 'Haze':
      recorded_weather = Haze_weather;
      break;
    default:
      recorded_weather = Clear_weather; 
      break;
  }

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${recorded_weather})`,
        height: "100%",
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "-1",
        filter: "brightness(0.8) contrast(1.2)",
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
          {data.main ? <h1>{((data.main.temp - 32) / 1.8).toFixed(2)} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          <div className="dmy">
            <div className="current-time">{ctime}</div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">{data.main.feels_like} °F</p>
            ) : null}

            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity} %</p> : null}

            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}

            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
