function newsRepository(repository) {
	const findAllNews = () => repository.findAll();
	const findNewsByID = (id) => repository.findByID(id);
	const addNews = (news) => repository.add(news);
	const deleteNewsByID = (id) => repository.deleteByID(id);

	return {
		findAllNews,
		findNewsByID,
		addNews,
		deleteNewsByID,
	};
}

module.exports = { newsRepository };
