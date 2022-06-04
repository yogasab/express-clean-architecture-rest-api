function newsRepository(repository) {
	const findAllNews = () => repository.findAll();

	return {
		findAllNews,
	};
}

module.exports = { newsRepository };
