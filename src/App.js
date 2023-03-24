import WeatherForecast from './weather/WeatherForecast';
import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <WeatherForecast/>
      </header>
    </div>
  );
}

export default App;
