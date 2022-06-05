function findNewsByTag(tag, newsRepository) {
	const lowerCasedTag = tag.toLowerCase();
	const news = newsRepository.findNewsByTag(lowerCasedTag);

	return news;
}

module.exports = { findNewsByTag };
