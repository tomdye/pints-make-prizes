import DataLoader from "src/DataLoader";
import WordSolver from "src/WordSolver";
import subjects from "data/subjects";

var currentSubjectIndex,
	wordLengths,
	loadedSubjects;

window.addEventListener('push', () => {
	var hash = window.location.hash;

	if (document.getElementById('input')) {
		var subjectMatch = hash.match(/subject\=(.*)/);
		if (subjectMatch) {
			currentSubjectIndex = subjectMatch[1];
		}

		document.getElementById("wordsButton").addEventListener("touchstart", function (evt) {
			var wordsForm = document.forms[0];
			var inputValues = Array.prototype.slice.apply(wordsForm.children).map(function (input) {
				return input.value - 0;
			});
			wordLengths = inputValues.filter(function (val) {
				return !!val;
			});
		});
	} else if (document.getElementById('words')) {
		var thisSubject = loadedSubjects[currentSubjectIndex];
		var wordSolver = new WordSolver(thisSubject.words, wordLengths[0]);
		var letterHolder = document.getElementById("letter");
		var wordsList = document.getElementById("possible-words");

		wordSolver.start();

		var currentLetter, possibleWords;

		document.getElementById("yesButton").addEventListener("touchend", function (evt) {
			possibleWords = wordSolver.yes(currentLetter);
			currentLetter = wordSolver.next();
			drawStuff();
		});

		document.getElementById("noButton").addEventListener("touchend", function (evt) {
			possibleWords = wordSolver.no(currentLetter);
			currentLetter = wordSolver.next();
			drawStuff();
		});

		function drawStuff() {
			var wordsListStr = "";
			letterHolder.innerHTML = currentLetter;


			if (possibleWords) {
				possibleWords.forEach(function (word) {
					wordsListStr += "<li class='table-view-cell'>" + word + "</li>";
				});

				wordsList.innerHTML = wordsListStr;
			}

		}

		 currentLetter = wordSolver.next();
		 drawStuff();






	}
});

var main = document.getElementById("main");
var dataLoader = new DataLoader(subjects);
dataLoader.start().then((subjects) => {
	loadedSubjects = subjects;

	var subjectsList = document.getElementById("subjectsList");
	subjects.forEach((subject, i) => {
		var li = document.createElement("li");
		li.classList.add("table-view-cell");
		var anchor = document.createElement("a");
		anchor.classList.add("navigate-right");
		anchor.innerHTML = subject.label;
		anchor.href = "./input.html#subject=" + i;
		li.appendChild(anchor);
		subjectsList.appendChild(li);
	});
});

