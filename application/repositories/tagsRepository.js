function tagsRepository(repository) {
	const findAllTags = () => repository.findAll();
	const findTagByID = (id) => repository.findByID(id);
	const findTagBySlug = (slug) => repository.findBySlug(slug);

	return {
		findAllTags,
		findTagByID,
		findTagBySlug,
	};
}

module.exports = { tagsRepository };
