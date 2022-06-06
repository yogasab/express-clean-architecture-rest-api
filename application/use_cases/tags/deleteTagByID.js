function deleteTagByID(id, tagsRepository) {
	const tags = tagsRepository.deleteTagByID(id);
	if (!tags) {
		return {};
	}

	return tagsRepository.deleteTagByID(id);
}

module.exports = { deleteTagByID };
