let container = document.querySelector(`.container`);
let search_box = document.querySelector(`.search_box`);
let place = document.querySelector(`.place`);
let weather_code = document.querySelector(`.weather_code`);
let temperature = document.querySelector(`.temperature`);
let wind_speed = document.querySelector(`.wind_speed`);
let wind_direction = document.querySelector(`.wind_direction`);

let search_history_div = document.querySelector(".search_history");
let history_button = document.querySelector(".history_button");
let effectsContainer = document.querySelector(".weather_effects");
let lightning = document.querySelector(".lightning");

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function renderHistory() {
  search_history_div.innerHTML = "";
  searchHistory
    .slice(-10)
    .reverse()
    .forEach((item) => {
      let historyItem = document.createElement("div");
      historyItem.classList.add("history_item");

      historyItem.innerHTML = `
      <strong>${item.name}</strong><br>
      🌡️ ${item.temperature}<br>
      💨 ${item.windspeed}<br>
      🧭 ${item.winddirection}
    `;

      historyItem.addEventListener("click", function () {
        search_box.value = item.name;
        triggerSearch(item.name);
      });
      search_history_div.appendChild(historyItem);
    });
}

function createRain() {
  effectsContainer.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
    drop.style.animationDelay = Math.random() * 2 + "s";
    effectsContainer.appendChild(drop);
  }
}

function createSnow() {
  effectsContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    let snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = 3 + Math.random() * 3 + "s";
    snow.style.animationDelay = Math.random() * 2 + "s";
    effectsContainer.appendChild(snow);
  }
}

function clearEffects() {
  effectsContainer.innerHTML = "";
  lightning.style.animation = "none";
}

function createStorm() {
  createRain();

  setTimeout(() => flashLightning(), 1000 + Math.random() * 2000);
}

function flashLightning() {
  lightning.style.animation = "none";
  lightning.offsetHeight;
  lightning.style.animation = "flash 0.2s ease-in-out";
  setTimeout(() => flashLightning(), 2000 + Math.random() * 4000);
}

function triggerSearch(value) {
  value = value.trim().toLowerCase();
  if (!value) return;

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}`)
    .then((response) => response.json())
    .then((data) => {
      data = data.results;
      if (!data || data.length === 0) return;
      let latitude = data[0].latitude;
      let longitude = data[0].longitude;
      place.textContent = data[0].name;

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
        .then((response) => response.json())
        .then((dataWeather) => {
          let tempText = `${dataWeather.current_weather.temperature}${dataWeather.current_weather_units.temperature}`;
          let windText = `${dataWeather.current_weather.windspeed}${dataWeather.current_weather_units.windspeed}`;
          let dirText = `${dataWeather.current_weather.winddirection}${dataWeather.current_weather_units.winddirection}`;

          temperature.textContent = `temperature: ${tempText}`;
          wind_speed.textContent = `wind speed: ${windText}`;
          wind_direction.textContent = `wind direction: ${dirText}`;

          let historyEntry = {
            name: data[0].name,
            temperature: tempText,
            windspeed: windText,
            winddirection: dirText,
          };

          searchHistory.push(historyEntry);
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          renderHistory();

          let code = dataWeather.current_weather.weathercode;

          clearEffects();

          if (code === 0) {
            weather_code.textContent = `Clear sky`;
          } else if ([1, 2, 3].includes(code)) {
            weather_code.textContent = `Mainly clear, partly cloudy, and overcast`;
          } else if ([45, 48].includes(code)) {
            weather_code.textContent = `Fog and depositing rime fog`;
          } else if ([51, 53, 55].includes(code)) {
            weather_code.textContent = `Drizzle: Light, moderate, and dense intensity`;
            createRain();
          } else if ([56, 57].includes(code)) {
            weather_code.textContent = `Freezing Drizzle: Light and dense intensity`;
            createRain();
          } else if ([61, 63, 65].includes(code)) {
            weather_code.textContent = `Rain: Slight, moderate and heavy intensity`;
            createRain();
          } else if ([66, 67].includes(code)) {
            weather_code.textContent = `Freezing Rain: Light and heavy intensity`;
            createRain();
          } else if ([71, 73, 75].includes(code)) {
            weather_code.textContent = `Snow fall: Slight, moderate, and heavy intensity`;
            createSnow();
          } else if (code === 77) {
            weather_code.textContent = `Snow grains`;
            createSnow();
          } else if ([80, 81, 82].includes(code)) {
            weather_code.textContent = `Rain showers: Slight, moderate, and violent`;
            createRain();
          } else if ([85, 86].includes(code)) {
            weather_code.textContent = `Snow showers slight and heavy`;
            createSnow();
          } else if (code === 95) {
            weather_code.textContent = `Thunderstorm: Slight or moderate`;
            createStorm();
          } else if ([96, 99].includes(code)) {
            weather_code.textContent = `Thunderstorm with slight and heavy hail`;
            createStorm();
          }
        });
    });
}

search_box.addEventListener(`keydown`, function (e) {
  if (e.key === `Enter`) {
    triggerSearch(this.value);
  }
});

history_button.addEventListener("click", function () {
  search_history_div.classList.toggle("visible");
});

renderHistory();
