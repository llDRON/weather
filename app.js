const weatherBlock = document.querySelector("#weather");

async function loadWeather(e) {
  weatherBlock.innerHTML = `<div class="weather-loading">
    <img src = "Gifs/loading.gif" alt = "Loading">
    </div>`;
  const server = `http://api.openweathermap.org/data/2.5/weather?q=IZMAIL&units=metric&APPID=5d066958a60d315387d9492393935c19`;
  const response = await fetch(server, {
    method: "GET",
  });

  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    alert(responseResult.message);
  }
}

function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const pressure = data.main.pressure;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const speed = data.wind.speed;
  const deg = data.wind.deg;
  const weatherIcon = data.weather[0].icon;

  const template = `<div class="weather-header">
  <div class="weather-main">
      <div class="weather-city">${location}</div>
      <div class="weather-temp">${temp}°с</div>
      <div class="description">${description}
      <div class="weather-icon">
      <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${description}">
  </div></div>
        <div class="pres-wind-block">
            <div class="atmosphere-block">ATMOSPHERE
             <div class="pressure">Pressure: ${pressure}mb/hPa</div>
                <div class="humidity">Humidity: ${humidity}%</div>
            </div>
        <div class="wind-block">Wind
            <div class="speed">Speed: ${speed}m/s</div>
             <div class="deg">Direction: ${deg}°</div>
        </div>
      </div>
      
  </div>
  
</div>

`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadWeather();
}
