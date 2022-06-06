function tagsRepository(repository) {
	const findAllTags = () => repository.findAll();

	return {
		findAllTags,
	};
}

module.exports = { tagsRepository };
