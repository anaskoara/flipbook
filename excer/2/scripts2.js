const backgroundSize = [951, 642];

const hotspots = [
	[422, 150],
	[573, 171],
	[404, 590],
	[315, 210],
];

const sloved = new Array(hotspots.length).fill(false);

const error = new Audio("error.mp3");
const intro = new Audio("intro.mp3");
const correctAnswers = [true, true, false, false];

var isIntroPlaying = false;

const div = document.getElementById("exer");
div.style.aspectRatio = backgroundSize[0] / backgroundSize[1];

// div.addEventListener("resize", (event) => {});
const resizeObserver = new ResizeObserver((entries) => {
	var hotspots = div.getElementsByClassName("hotspot");

	[...hotspots].forEach((element) => {
		div.removeChild(element);
	});
	init();
});

resizeObserver.observe(div);

function init() {
	hotspots.forEach((hotspot, index) => {
		addDiv(hotspot, index);
	});
}

function addDiv([x, y], index) {
	var circle = document.createElement("div");
	circle.classList.add("hotspot");
	if (sloved[index]) {
		circle.classList.add("checked");
	}
	circle.setAttribute("data-index", index);

	let left = Math.round((x / backgroundSize[0]) * div.offsetWidth - 10);
	let top = Math.round((y / backgroundSize[1]) * div.offsetHeight - 10);

	circle.style.left = left + "px";
	circle.style.top = top + "px";

	div.appendChild(circle);
	circle.addEventListener("click", handleClick);
}

const handleClick = (event) => {
	var hotspot = event.target;
	var index = hotspot.getAttribute("data-index");
	if (correctAnswers[index]) {
		hotspot.classList.add("checked");
		sloved[index] = true;
		return;
	}
	hotspot.classList.add("error");
	error.play();
	setTimeout(() => {
		hotspot.classList.remove("error");
	}, 1000);
};

function playIntro(e) {
	if (isIntroPlaying) return;

	isIntroPlaying = true;
	intro.play();
	isIntroPlaying = false;
}
