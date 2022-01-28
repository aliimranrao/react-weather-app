import './App.css';
import WeatherTile from './components/WeatherTile';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useState, useEffect } from 'react/cjs/react.development';
import React from 'react';
let coordinates = {
  lat: 24.614162,
  lng: 67.082216,
  type: "daily"
}

function App() {
  const [weatherArr, setWeatherArr] = useState([]);

  // Note: This function will call api...!
  const callApi = async () => {

    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=4fcd41771cc91187db1651ddcc10916f`;

    try {
      let response = await axios(
        {
          method: "GET",
          url: api
        }
      );
      console.log(response.data.daily);

      if (response.status == 200) {
        let data = response.data.daily;
        setWeatherArr(data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  // Note: When this component rendered successfully then this hook will run and call the api...!
  useEffect(() => callApi(), []);

  return (
    <div>
      {
        weatherArr.map(
          function (item, index) {
            return <WeatherTile dayNum={index + 1} temp={item.temp.day} min={item.temp.min} max={item.temp.max} />
          }
        )
      }
    </div>
  );
}

export default App;
