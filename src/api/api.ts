export default class API {
	static async getLanguage() {
		return fetch('./translate/translate.json')
			.then(response => response.json())
			.then(data => data);
	}
}
