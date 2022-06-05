const { news } = require("../../../src/entities/news");

function updateNewsByID({
	id,
	title,
	body,
	author,
	tags,
	status,
	newsRepository,
}) {
	if (!title || !body || !author) {
		throw new Error("Please fill the required field");
	}

	const updatedNews = news({ title, body, author, tags, status });

	return newsRepository.updateNewsByID(id, updatedNews);
}

module.exports = { updateNewsByID };
