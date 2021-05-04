const clockContainer = document.querySelector(".js-clock"),
			clockTitle = clockContainer.querySelector("h1");

function getTime() {
	const date = new Date();
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();
	const fixedHours = hours < 10 ? `0${hours}` : hours;
	const fixedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const fixedSeconds = seconds < 10 ? `0${seconds}` : seconds;
	clockTitle.innerText = `${fixedHours}:${fixedMinutes}:${fixedSeconds}`;
}

function init() {
	getTime()
	setInterval(getTime, 1000);
}

init();