function newsRepository(repository) {
	const findAllNews = () => repository.findAll();
	const findNewsByID = (id) => repository.findByID(id);
	const addNews = (news) => repository.add(news);

	return {
		findAllNews,
		findNewsByID,
		addNews,
	};
}

module.exports = { newsRepository };
