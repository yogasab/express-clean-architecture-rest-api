function newsRepository(repository) {
	const findAllNews = () => repository.findAll();
	const findNewsByID = (id) => repository.findByID(id);
	const addNews = (news) => repository.add(news);
	const deleteNewsByID = (id) => repository.deleteByID(id);
	const updateNewsByID = (id, news) => repository.updateByID(id, news);

	return {
		findAllNews,
		findNewsByID,
		addNews,
		deleteNewsByID,
		updateNewsByID,
	};
}

module.exports = { newsRepository };
