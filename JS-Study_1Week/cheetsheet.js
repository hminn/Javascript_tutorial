const API_KEY = "9b93bb93e46d7e12f2285b35595b9a0d";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      const humidity = json.main.humidity;
      const weatherText = json.weather["0"].main;

      const tempTag = document.querySelector(".temp__text");
      const humidityTag = document.querySelector(".humidity__text");
      const placeTag = document.querySelector(".place__text");

      tempTag.innerText = `기온 : ${temperature}˚C (${weatherText})`;
      humidityTag.innerText = `습도 : ${humidity}%`;
      placeTag.innerText = `현재 위치 : ${place}`;
	  console.log(json);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // 객체의 key의 이름을 같게 저장할 때는 latitude : latitude 대신에 latitude를 써도 된다.
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}
function init() {
  loadCoords();
}

init();
