export default class WordSolver {

	constructor(words, count) {
		this._words = words;
		this._count = count;
		this._exclusions = [];
		this._yes = [];
	}

	start() {
		this._set = this._reduceByWordCount(this._words, this._count);
	}

	next() {
		var frequency = this._countCharacters(this._set);
		var character = this._getNext(frequency);
		this._exclusions.push(character);
		return character;
	}

	yes(character) {
		this._set = this._reduceByCharacter(this._set, character);
		return this._set;
	}

	no(character) {
		this._set = this._reduceByNoCharacter(this._set, character);
		return this._set;
	}

	_reduceByWordCount(words, count) {
		var set = [];
		words.forEach((word) => {
			if (word.split(" ").length === count) {
				set.push(word);
			}
		});
		return set;
	}

	_reduceByCharacter(words, character) {
		var reducedWords = [];
		words.forEach((word) => {
			if (word.toUpperCase().indexOf(character) > -1) {
				reducedWords.push(word);
			}
		});
		return reducedWords;
	}

	_reduceByNoCharacter(words, character) {
		var reducedWords = [];
		words.forEach((word) => {
			if (word.toUpperCase().indexOf(character) < 0) {
				reducedWords.push(word);
			}
		});
		return reducedWords;
	}

	_getNext(characters) {
		var count = 0;
		var character;
		Object.keys(characters).forEach((key) => {
			if (characters[key] > count) {
				character = key;
				count = characters[key];
			}
		});
		return character;
	}

	_countCharacters(words) {
		var characterFrequency = {};
		words.forEach((word) => {
			var characters = word.replace(/\W/gi, "").split("");
			characters.forEach((character) => {
				character = character.toUpperCase();
				if (this._exclusions.indexOf(character) < 0) {
					characterFrequency[character] = characterFrequency[character] || 0;
					characterFrequency[character] += 1;
				}
			});
		});
		return characterFrequency;
	}
}
