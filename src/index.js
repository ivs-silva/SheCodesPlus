let currentTime = new Date();
function formatDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Saturday"];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedDate = `${currentDay}. ${currentDate} ${currentMonth}.${currentYear} - ${currentHour}h${currentMinute}`;

  return formattedDate;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day + 1];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#weather-forecast");

  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `    <div class="card" style="width: 8rem">
        <ul class="list-group list-group-flush">
             <li class="list-group-item cardstyle" id="wether-following-day">${formatForecastDay(
               forecastDay.time
             )}</li>
            <li class="list-group-item cardstyle">
              <img id="weather-icon" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="${forecastDay.condition.description}" />
              <span id="weather-following-day">${Math.round(
                forecastDay.temperature.maximum
              )}° / </span>
              <span id="min-temp-weather-following-day"> ${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </li>
          </ul>
          </div>`;
    }
  });
  weatherForecast.innerHTML = forecastHTML;
}

let displayCurrentDate = document.querySelector("#current-date");
displayCurrentDate.innerHTML = formatDate(currentTime);

function DisplayCurrentCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  let newCity = document.querySelector("#display-current-city");
  newCity.innerHTML = currentCity.value;
  let apiKey = "734273ccf9a2ecd1e07fb3c5t7o319bd";
  let url = `https://api.shecodes.io/weather/v1/current?query=${currentCity.value}&units=metric&key=${apiKey}`;
  axios.get(url).then(showWeather);
}
let button = document.querySelector("#form-city");
button.addEventListener("submit", DisplayCurrentCity);

function getForecast(coordinates) {
  let apiKey = "734273ccf9a2ecd1e07fb3c5t7o319bd";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(displayForecast);
}

function showWeather(response) {
  console.log(response.data);
  let currentPositionTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let CurrentCityName = document.querySelector("#display-current-city");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind-speed");
  let currentPrecipitation = document.querySelector("#current-precipitation");
  let currentIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  currentPositionTemperature.innerHTML = ` ${temperature}`;
  CurrentCityName.innerHTML = `${response.data.city}`;
  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  currentWind.innerHTML = `Wind speed: ${response.data.wind.speed}mph`;
  currentPrecipitation.innerHTML = `Feels like: ${response.data.temperature.feels_like}°`;
  currentIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function retrievePosition(position) {
  let apiKey = "734273ccf9a2ecd1e07fb3c5t7o319bd";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function ConverttoFahrenheit(event) {
  event.preventDefault();
  let temperatureCelsius = document.querySelector("#temperature");
  celsiusbutton.classList.remove("active-link");
  fahrenheitbutton.classList.add("active-link");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureCelsius.innerHTML = Math.round(fahrenheitTemperature);
}

function ConverttoCelsius(event) {
  event.preventDefault();
  celsiusbutton.classList.add("active-link");
  fahrenheitbutton.classList.remove("active-link");
  let temperatureFahrenheit = document.querySelector("#temperature");
  temperatureFahrenheit.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitbutton = document.querySelector("#fahrenheit-link");
fahrenheitbutton.addEventListener("click", ConverttoFahrenheit);

let celsiusbutton = document.querySelector("#celsius-link");
celsiusbutton.addEventListener("click", ConverttoCelsius);
