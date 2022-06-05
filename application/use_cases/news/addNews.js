const { news } = require("../../../src/entities/news");

function addNews({ title, body, author, tags, status, newsRepository }) {
	if (!title || !body || !author) {
		throw new Error("Please fill the required field");
	}

	const newNews = news({ title, body, author, tags, status });

	return newsRepository.addNews(newNews);
}

module.exports = { addNews };
