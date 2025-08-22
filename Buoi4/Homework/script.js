let search_box = document.querySelector(`.search_box`);
let place = document.querySelector(`.place`);
let weather_code = document.querySelector(`.weather_code`);
let temperature = document.querySelector(`.temperature`);
let wind_speed = document.querySelector(`.wind_speed`);

search_box.addEventListener(`keydown`, function (e) {
  if (e.key === `Enter`) {
    let value = this.value.trim().toLowerCase();
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data = data.results;
        let latitude = data[0].latitude;
        let longitude = data[0].longitude;
        place.textContent = data[0].name;

        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (dataWeather) {
            console.log(dataWeather);
            temperature.textContent = `${dataWeather.current_weather.temperature}${dataWeather.current_weather_units.temperature}`;
            wind_speed.textContent = `${dataWeather.current_weather.windspeed}${dataWeather.current_weather_units.windspeed}`;
            if (dataWeather.current_weather.weathercode === 0) {
              weather_code.textContent = `Clear sky`;
            } else if (
              dataWeather.current_weather.weathercode === 1 ||
              2 ||
              3
            ) {
              weather_code.textContent = `Mainly clear, partly cloudy, and overcast`;
            } else if (dataWeather.current_weather.weathercode === 45 || 48) {
              weather_code.textContent = `Fog and depositing rime fog`;
            } else if (
              dataWeather.current_weather.weathercode === 51 ||
              53 ||
              55
            ) {
              weather_code.textContent = `Drizzle: Light, moderate, and dense intensity`;
            } else if (dataWeather.current_weather.weathercode === 56 || 57) {
              weather_code.textContent = `Freezing Drizzle: Light and dense intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 61 ||
              63 ||
              65
            ) {
              weather_code.textContent = `Rain: Slight, moderate and heavy intensity`;
            } else if (dataWeather.current_weather.weathercode === 66 || 67) {
              weather_code.textContent = `Freezing Rain: Light and heavy intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 71 ||
              73 ||
              75
            ) {
              weather_code.textContent = `Snow fall: Slight, moderate, and heavy intensity`;
            } else if (dataWeather.current_weather.weathercode === 77) {
              weather_code.textContent = `Snow grains`;
            } else if (
              dataWeather.current_weather.weathercode === 80 ||
              81 ||
              82
            ) {
              weather_code.textContent = `Rain showers: Slight, moderate, and violent`;
            } else if (dataWeather.current_weather.weathercode === 85 || 86) {
              weather_code.textContent = `Snow showers slight and heavy`;
            } else if (dataWeather.current_weather.weathercode === 95) {
              weather_code.textContent = `Thunderstorm: Slight or moderate`;
            } else if (dataWeather.current_weather.weathercode === 96 || 99) {
              weather_code.textContent = `Thunderstorm with slight and heavy hail`;
            }
          });
      });
  }
});

function setGradientByTime() {
  const hour = new Date().getHours();
  let gradient = "";

  if (hour >= 5 && hour < 11) {
    gradient = "linear-gradient(to bottom, #FFA500, #FFD700)";
  } else if (hour >= 11 && hour < 15) {
    gradient = "linear-gradient(to bottom, #25edffff, #4cd2ffff)";
  } else if (hour >= 15 && hour < 18) {
    gradient = "linear-gradient(to bottom, #FFD700, #FF8C00)";
  } else {
    gradient = "linear-gradient(to bottom, #00004dff, #310053ff)";
  }

  document.body.style.background = gradient;
}
setGradientByTime();
setInterval(setGradientByTime, 5 * 60 * 1000);
