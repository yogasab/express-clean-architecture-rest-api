function findTagByID(ID, tagsRepository) {
	const tags = tagsRepository.findTagByID(ID);

	return tags;
}

module.exports = { findTagByID };
