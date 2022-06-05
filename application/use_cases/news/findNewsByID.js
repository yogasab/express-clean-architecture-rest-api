function findNewsByID(ID, newsRepository) {
	const news = newsRepository.findNewsByID(ID);

	return news;
}

module.exports = { findNewsByID };
