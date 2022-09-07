const answers = [true, false, false, true, true, true, true, true];
const names = ["ضرس", "دراجة", "دائرة", "بيض", "ضبع", "مضرب", "خضار", "ضفدع"];
const sloved = new Array(names.length).fill(false);
const error = new Audio("error.mp3");

const div = document.getElementById("exer");

function init() {
	answers.forEach((answer, index) => {
		var sample = document.createElement("div");
		sample.classList.add("sample");

		var fig = document.createElement("div");
		fig.classList.add("fig");
		sample.appendChild(fig);

		var img = document.createElement("img");
		img.src = `./3/${index + 1}.jpeg`;
		fig.appendChild(img);

		var text = document.createElement("p");
		text.setAttribute("data-index", index);
		text.innerText = names[index];
		text.addEventListener("click", handleClick);

		sample.appendChild(text);

		div.appendChild(sample);
	});
}

const handleClick = (event) => {
	var hotspot = event.target;
	var index = hotspot.getAttribute("data-index");
	if (answers[index]) {
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

init();
