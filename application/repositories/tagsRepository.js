function tagsRepository(repository) {
	const findAllTags = () => repository.findAll();
	const findTagByID = (id) => repository.findByID(id);
	const findTagBySlug = (slug) => repository.findBySlug(slug);
	const addTag = (tag) => repository.add(tag);
	const updateTagByID = (id, updatedTag) => repository.update(id, updatedTag);
	const deleteTagByID = (id) => repository.remove(id);

	return {
		findAllTags,
		findTagByID,
		findTagBySlug,
		addTag,
		updateTagByID,
		deleteTagByID,
	};
}

module.exports = { tagsRepository };
