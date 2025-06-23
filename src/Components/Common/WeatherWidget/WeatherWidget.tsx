/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useEffect, useState } from "react";
import RequestFrameInterval from "../../../Modules/RequestFrameInterval";
// Resources
import icArrow from "../../../Resources/Common/Icons/ic-arrow.png";
import icWeatherCloud from "../../../Resources/Common/Icons/weather/001-cloud.png";
import icWeatherLightRain from "../../../Resources/Common/Icons/weather/002-light rain.png";
import icWeatherHeavyRain from "../../../Resources/Common/Icons/weather/008-heavy rain.png";
import icWeatherRain from "../../../Resources/Common/Icons/weather/009-rain.png";
import icWeatherDay from "../../../Resources/Common/Icons/weather/011-day.png"
import icWeatherSun from "../../../Resources/Common/Icons/weather/046-sun.png"

// Styles
import "./WeatherWidget.scss";

// Types
import { IWeatherAPIData } from "./WeatherWidget.d";

// CONSTRAINTS
// -- Lotte_folk_museum
// const API_KEY = "493db7a90093cdc0b45e2f0896827b74";
// const POS = {
//   lat: 37.513533,
//   lon: 127.1041032,
// };


// -- Skt-t-tower
const API_KEY = "09002c892830cc4a7ac14fae07a00b36";
const POS = {
  lat: 37.566448,
  lon: 126.985114,
}


// -- Daejeon Convension Center --
// const API_KEY = "c34f61b03d91e4b14def458faa08eab6";
// const POS = {
//   lat: 36.3750989,
//   lon: 127.3889434
// }


// -- The Hyundai Department TRADE CENTER --
// const API_KEY = "493db7a90093cdc0b45e2f0896827b74";
// const POS = {
//   lat: 37.5041073,
//   lon: 127.0475882,
// };

// Default Values
// -- Lotte_folk_museum
const DEFAULT_VALUES = {
  "coord": {
    "lon":127.1041,
    "lat":37.5135
  },
  "weather": [
    {
      "id":502,
      "main":"Rain",
      "description":"강한 비",
      "icon":"10d"
    },
    {
      "id":701,
      "main":"Mist",
      "description":"박무",
      "icon":"50d"
    }
  ],
  "base":"stations",
  "main": {
    "temp":18.98,
    "feels_like":19.44,
    "temp_min":18.67,
    "temp_max":19.03,
    "pressure":1007,
    "humidity":96
  },
  "visibility":4000,
  "wind": {
    "speed":5.14,
    "deg":10
  },
  "rain": {
    "1h":3.65
  },
  "clouds": {
    "all":100
  },
  "dt":1662360185,
  "sys": {
    "type":1,
    "id":8096,
    "country":"KR",
    "sunrise":1662325495,
    "sunset":1662371786
  },
  "timezone":32400,
  "id":6571507,
  "name":"Samjeon-dong",
  "cod":200
}

export default function WeatherIcon() {
  // example : https://api.openweathermap.org/data/2.5/weather?lat=37.513533&lon=127.1041032&units=metric&lang=kr&appid=493db7a90093cdc0b45e2f0896827b74
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${POS.lat}&lon=${POS.lon}&units=metric&lang=kr&appid=${API_KEY}`;

  const [weatherState, setWeatherState] = useState<any>(DEFAULT_VALUES);

  const getWeatherInfo = () => {
    console.log("getWeatherInfo");
    const storedWeatherLastUpdate = parseInt(
      localStorage.getItem("weather_last_update") || "0",
      10
    );
    const storedWeatherInfo = localStorage.getItem("weather_last_info");


    if (storedWeatherLastUpdate + 60000 > Date.now()) {
      if (storedWeatherInfo) {
        const parsed = JSON.parse(storedWeatherInfo);
        setWeatherState(parsed);
      } else {
        setWeatherState(DEFAULT_VALUES);
      }
    } else {
      axios
        .get(URL)
        .then((res) => {
          console.log(res);
          const { status } = res;
          if (status === 200) {
            const { data } = res;

            console.log(data);

            localStorage.setItem("weather_last_update", Date.now().toString());
            localStorage.setItem("weather_last_info", JSON.stringify(data));

            setWeatherState(data);
            // setCovidListData((prevState) => ({
            //   ...prevState,
            //   [robotID]: {
            //     robotID,
            //     data,
            //   },
            // }));
          }
        })
        .catch((err) => {
          console.log("get weather error", err);
        });
    }
  };

  const getWeatherIcon = (iconCode: string | undefined) => {
    switch(iconCode) {
      case "01d": return icWeatherSun;
      case "02d": return icWeatherDay;
      case "03d": return icWeatherCloud;
      case "09d": return icWeatherLightRain;
      case "10d": return icWeatherHeavyRain;
    }

    return icWeatherSun;
  }

  useEffect(() => {
    getWeatherInfo();
    RequestFrameInterval.addInterval(getWeatherInfo, "weather_widget", 60000);
    return () => {
      RequestFrameInterval.removeAllGroup("weather_widget");
    };
  }, []);

  return (
    <div id="weather-widget">
      <div className="address">
        <span className="name">중구</span>
        <img src={icArrow} />
      </div>
      <div className="current-temp">
        <span className="value">{Math.round(weatherState?.main?.temp) || "0.0"}</span>°
      </div>
      <div className="icon"><img src={getWeatherIcon(weatherState?.weather[0]?.icon)} /></div>
      <div className="desc">
        {weatherState?.weather[0]?.description || "맑음"}
      </div>
      <div className="temp-info">
        최고:<span className="max">{weatherState?.main?.temp_max?.toFixed(1) || "0.0"}</span>
        /최저:<span className="min">{weatherState?.main?.temp_min?.toFixed(1) || "0.0"}</span>
      </div>
    </div>
  );
}
