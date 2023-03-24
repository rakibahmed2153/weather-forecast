import React, { useEffect, useState } from "react";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentdate] = useState("");
  const [image, setImage] = useState("url('./bg.jpg')");

  const API_KEY = "b841aa86084d40a3381b83071bb0fdfd";

  const fetchData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log('data', data)
    if(data.cod === 200){
      setWeatherData(data);
      setBackground(data.weather[0].main, data.main.temp)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const CurrentDate = () =>{
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[today.getDay()];
    const dayNum = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${dayName} ${dayNum} ${monthName}, ${year}`;

    setCurrentdate(formattedDate)
  }

  const setBackground = (weather, temp) =>{
    if (temp < 0){
      setImage("url('./fog.jpeg')"); 
    }
    else{
      switch (weather)
      {
        case "Haze":
          setImage("url('./haze.jpg')");
          break;
        case "Clouds":
          setImage("url('./cloudy.jpeg')");
          break;
        case "Rain":
          setImage("url('./rain.jpg')");
          break;
        case "Snow":
          setImage("url('./snow.jpg')");
          break;
        case "Dust":
          setImage("url('./dust.jpeg')");
          break;
        case "Drizzle":
          setImage("url('./drizzle.jpeg')");
          break;
        case "Fog":
          setImage("url('./fog.jpeg')");
          break;
        case "Smoke":
          setImage("url('./smoke.jpeg')");
          break;
        case "Tornado":
          setImage("url('./wind.jpeg')");
          break;
        default:
          setImage("url('./bg.jpg')");
    }
    }
}
  
  useEffect(() => {
    CurrentDate()
  }, [])

  return (
    <div className="app-wrap backgb" style={{backgroundImage: image}}>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input type="text" value={location} placeholder="Type Location" onChange={(event)=>setLocation(event.target.value)} />
        <button className="buttonStyle" type="submit">Weather Forecast</button>
      </form> 
      {weatherData.main && (
      <main>
        <section className="location" style={{textShadow: '2px 2px rgb(0 0 0 / 60%)'}}>
          <div className="city">{weatherData.name}</div>
          <div className="date">{currentDate}</div>
        </section>
        <div className="current">
          <div className="temp">{weatherData.main.temp}<span>°c</span></div>
          <div className="weather">{weatherData.weather[0].description}</div>
          <div title="Minimum_Temperature / Maximum_Temperature" className="hi-low">{weatherData.main.temp_min}°c / {weatherData.main.temp_max}°c</div>
          <div className="hi-low">Humidity {weatherData.main.humidity}</div>
        </div>
      </main>
      )}
  </div>
  );
};

export default WeatherForecast;