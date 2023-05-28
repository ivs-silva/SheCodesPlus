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

let displayCurrentDate = document.querySelector("#current-date");
displayCurrentDate.innerHTML = formatDate(currentTime);

function DisplayCurrentCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  let newCity = document.querySelector("#display-current-city");
  newCity.innerHTML = currentCity.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
let button = document.querySelector("#form-city");
button.addEventListener("submit", DisplayCurrentCity);

function showWeather(response) {
  let currentPositionTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let CurrentCityName = document.querySelector("#display-current-city");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWind = document.querySelector("#current-wind-speed");
  let currentPrecipitation = document.querySelector("#current-precipitation");
  let currentIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  currentPositionTemperature.innerHTML = ` ${temperature}`;
  CurrentCityName.innerHTML = `${response.data.name}`;
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWind.innerHTML = `Wind speed: ${response.data.wind.speed}mph`;
  currentPrecipitation.innerHTML = `Today: ${response.data.weather[0].main}`;
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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
