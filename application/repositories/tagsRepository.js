function tagsRepository(repository) {
	const findAllTags = () => repository.findAll();
	const findTagByID = (id) => repository.findByID(id);

	return {
		findAllTags,
		findTagByID,
	};
}

module.exports = { tagsRepository };
