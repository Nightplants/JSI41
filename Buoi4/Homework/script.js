let container = document.querySelector(`.container`);
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
              container.style.backgroundColor = `skyblue`;
            } else if (
              dataWeather.current_weather.weathercode === 1 ||
              dataWeather.current_weather.weathercode === 2 ||
              dataWeather.current_weather.weathercode === 3
            ) {
              weather_code.textContent = `Mainly clear, partly cloudy, and overcast`;
              container.style.backgroundColor = `skyblue`;
            } else if (
              dataWeather.current_weather.weathercode === 45 ||
              dataWeather.current_weather.weathercode === 48
            ) {
              weather_code.textContent = `Fog and depositing rime fog`;
            } else if (
              dataWeather.current_weather.weathercode === 51 ||
              dataWeather.current_weather.weathercode === 53 ||
              dataWeather.current_weather.weathercode === 55
            ) {
              weather_code.textContent = `Drizzle: Light, moderate, and dense intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 56 ||
              dataWeather.current_weather.weathercode === 57
            ) {
              weather_code.textContent = `Freezing Drizzle: Light and dense intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 61 ||
              dataWeather.current_weather.weathercode === 63 ||
              dataWeather.current_weather.weathercode === 65
            ) {
              weather_code.textContent = `Rain: Slight, moderate and heavy intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 66 ||
              dataWeather.current_weather.weathercode === 67
            ) {
              weather_code.textContent = `Freezing Rain: Light and heavy intensity`;
            } else if (
              dataWeather.current_weather.weathercode === 71 ||
              dataWeather.current_weather.weathercode === 73 ||
              dataWeather.current_weather.weathercode === 75
            ) {
              weather_code.textContent = `Snow fall: Slight, moderate, and heavy intensity`;
            } else if (dataWeather.current_weather.weathercode === 77) {
              weather_code.textContent = `Snow grains`;
            } else if (
              dataWeather.current_weather.weathercode === 80 ||
              dataWeather.current_weather.weathercode === 81 ||
              dataWeather.current_weather.weathercode === 82
            ) {
              weather_code.textContent = `Rain showers: Slight, moderate, and violent`;
            } else if (
              dataWeather.current_weather.weathercode === 85 ||
              dataWeather.current_weather.weathercode === 86
            ) {
              weather_code.textContent = `Snow showers slight and heavy`;
            } else if (dataWeather.current_weather.weathercode === 95) {
              weather_code.textContent = `Thunderstorm: Slight or moderate`;
            } else if (
              dataWeather.current_weather.weathercode === 96 ||
              dataWeather.current_weather.weathercode === 99
            ) {
              weather_code.textContent = `Thunderstorm with slight and heavy hail`;
            }
          });
      });
  }
});
