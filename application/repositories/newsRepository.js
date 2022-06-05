function newsRepository(repository) {
	const findAllNews = () => repository.findAll();
	const findNewsByID = (id) => repository.findByID(id);
	const addNews = (news) => repository.add(news);
	const deleteNewsByID = (id) => repository.deleteByID(id);
	const updateNewsByID = (id, news) => repository.updateByID(id, news);
	const findNewsByStatus = (id) => repository.findByStatus(id);

	return {
		findAllNews,
		findNewsByID,
		addNews,
		deleteNewsByID,
		updateNewsByID,
		findNewsByStatus,
	};
}

module.exports = { newsRepository };
