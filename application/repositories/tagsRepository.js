function tagsRepository(repository) {
	const findAllTags = () => repository.findAll();
	const findTagByID = (id) => repository.findByID(id);
	const findTagBySlug = (slug) => repository.findBySlug(slug);
	const addTag = (tag) => repository.add(tag);
	const updateTagByID = (id, updatedTag) => repository.update(id, updatedTag);

	return {
		findAllTags,
		findTagByID,
		findTagBySlug,
		addTag,
		updateTagByID,
	};
}

module.exports = { tagsRepository };
