function findNewsByStatus(status, newsRepository) {
	const news = newsRepository.findNewsByStatus(status);

	return news;
}

module.exports = { findNewsByStatus };
