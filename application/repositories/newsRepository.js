function newsRepository(repository) {
	const findAllNews = () => repository.findAll();
	const findNewsByID = (id) => repository.findByID(id);

	return {
		findAllNews,
		findNewsByID,
	};
}

module.exports = { newsRepository };
