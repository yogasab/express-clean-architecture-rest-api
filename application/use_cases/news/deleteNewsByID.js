function deleteNewsByID(id, newsRepository) {
	const news = newsRepository.findNewsByID(id);
	if (!news) {
		return {};
	}

	return newsRepository.deleteNewsByID(id);
}

module.exports = { deleteNewsByID };
