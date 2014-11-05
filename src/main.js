import DataLoader from "src/DataLoader";
import WordSolver from "src/WordSolver";
import subjects from "data/subjects";

var currentSubjectIndex;

window.addEventListener('push', () => {
	var hash = window.location.hash
	var subjectMatch = hash.match(/subject\=(.*)/);
	if (subjectMatch) {
		currentSubjectIndex = subjectMatch[1];
	}
	if (false) {
		var wordSolver = new WordSolver(currentSubjectIndex, currentWordCount);
		wordSolver.start();
	}
});

var main = document.getElementById("main");
var dataLoader = new DataLoader(subjects);
dataLoader.start().then((subjects) => {
	subjects.forEach((subject, i) => {
		var li = document.createElement("li");
		li.classList.add("table-view-cell");
		var anchor = document.createElement("a");
		anchor.classList.add("navigate-right");
		anchor.innerHTML = subject.label;
		anchor.href = "./input.html#subject=" + i;
		li.appendChild(anchor);
		var subjectsList = document.getElementById("subjectsList");
		subjectsList.appendChild(li);
	});
})

