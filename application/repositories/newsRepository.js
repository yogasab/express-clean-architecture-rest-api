function newsRepository(repository) {
	const findAll = () => repository.findAllNews();

	return {
		findAll,
	};
}

module.exports = { newsRepository };
