function findNewsByID(ID, newsRepository) {
	const news = newsRepository.findNewsByID(ID);
	// if (!news) return {};

	return news;
}

module.exports = { findNewsByID };
