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
});

var main = document.getElementById("main");
var dataLoader = new DataLoader(subjects);
dataLoader.start().then((subjects) => {
	var aTeamSubject = subjects[0];
	var wordSolver = new WordSolver(aTeamSubject.words, 4);
	wordSolver.start();
window.wordSolver = wordSolver;


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

