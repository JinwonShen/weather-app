// api key == 유저에게 유니크하게 제공이 된다.

const api = {
  key: "15dd264653ae19e803a868ed7fb3c895",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBoxEl = document.querySelector(".search-box");
searchBoxEl.addEventListener("keypress", setQuery);

function setQuery(e) {
  //keycode 13 === "enter"
  if (e.keyCode === 13) {
    getResult(searchBoxEl.value);
    console.log(searchBoxEl.value);
  }
}

function getResult(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then((data) => displayResult(data));
}

function displayResult(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name} + ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}`;
}

function dateBuilder(d) {
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

  let days = [
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
