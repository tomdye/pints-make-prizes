export default class DataLoader {
	constructor(subjects) {
		this._basePath = "data/";
		this._subjects = subjects;
	}

	start() {
		return this._loadAll(this._subjects);
	}

	_loadAll(subjects) {
		var promises = subjects.map((subject) => {
			return this._load(subject);
		});
		return Promise.all(promises);
	}

	_load(subject) {
		return System.import(this._basePath + subject.module).then((result) => {
			return {
				"label": subject.label,
				"words": result
			}
		});
	}
}
