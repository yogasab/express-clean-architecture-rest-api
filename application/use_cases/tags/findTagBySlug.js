function findTagBySlug(slug, tagsRepository) {
	const lowerCasedSlug = slug.toLowerCase();
	const tag = tagsRepository.findTagBySlug(lowerCasedSlug);

	return tag;
}

module.exports = { findTagBySlug };
