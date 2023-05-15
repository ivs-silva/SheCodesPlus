let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} - ${currentHour}h${currentMinute}`;

  return formattedDate;
}

let displayCurrentDate = document.querySelector("#current-date");
displayCurrentDate.innerHTML = formatDate(currentTime);

function DisplayCurrentCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  let newCity = document.querySelector("#current-city");
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
  currentPositionTemperature.innerHTML = ` ${temperature}° in ${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

//temperature
/*
function ConverttoFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let stringtoNumber = Number(temperature);
  let numberCelsiusToFahrenheit = stringtoNumber * 9;

  temperature.innerHTML = numberCelsiusToFahrenheit;
}

let fahrenheitbutton = document.querySelector("#fahrenheit-link");
fahrenheitbutton.addEventListener("click", ConverttoFahrenheit);

let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// write your code here

function askForCity() {
  let city = prompt("Enter a city").toLowerCase().trim();

  if (weather[city] !== undefined) {
    let roundnumber = weather[city].temp;
    roundnumber = Math.round(roundnumber);
    let numberCelsiusToFahrenheit = (roundnumber * 9) / 5 + 32;
    let cityName = city.charAt(0).toUpperCase() + city.slice(1);

    alert(
      `it is currently ${roundnumber}°C (${numberCelsiusToFahrenheit}°F) in ${cityName} with a humidity of ${weather[city].humidity}%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

askForCity();
*/
