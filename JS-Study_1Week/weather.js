import {MAPS_API_KEY, GEO_API_KEY} from "./secret.js";

const MY_COORDS = "my_coords";
const resetBtn = document.querySelector(".coord-reset__btn");
const choiceBtnItems = document.querySelectorAll(".choice__btn");

function putWeatherText(json){
	const temperature = json.main.temp_max;
	const humidity = json.main.humidity;
	const placeName = json.name;
	const weatherText = json.weather["0"].main;

	const weatherTag = document.querySelector(".description__text");
	const tempTag = document.querySelector(".temp__text");
	const humidityTag = document.querySelector(".humidity__text");
	const placeTag = document.querySelector(".place__text");

	weatherTag.innerHTML = `날씨 : ${weatherText}`;
	tempTag.innerHTML = `기온 : ${temperature}˚C`;
	humidityTag.innerHTML = `습도 : ${humidity} %`;
	placeTag.innerHTML = `현재 위치 : ${placeName}`;
}

function getMyWeather(lat, lng) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${GEO_API_KEY}&units=metric`
	).then(response => response.json())
	.then(json => putWeatherText(json));
}

function saveCoords(coordsObj) {
	localStorage.setItem(MY_COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
	console.log("Can't access geo location");
}

function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getMyWeather(latitude, longitude);
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function deleteCoords() {
	localStorage.removeItem(MY_COORDS);
	location.reload()
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(MY_COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getMyWeather(parsedCoords.latitude, parsedCoords.longitude);
	}
}

function changeText(event) {
	const CITY = event.toElement.id
	if (CITY === 'my-town') {
		loadCoords()
	} else {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${GEO_API_KEY}&units=metric`
	).then(response => response.json())
	.then(json => putWeatherText(json));
	}
}

function init() {
	resetBtn.addEventListener("click", deleteCoords);
	choiceBtnItems.forEach(function(choiceBtn) {
		choiceBtn.addEventListener("click", changeText);
	})
	loadCoords();
}

init();