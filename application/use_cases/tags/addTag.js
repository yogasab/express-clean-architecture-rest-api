const { tags } = require("../../../src/entities/tags");

function addTag({ name, tagsRepository }) {
	if (!name) {
		throw new Error("Please fill the required field");
	}

	const newTags = tags({ name });

	return tagsRepository.addTag(newTags);
}

module.exports = { addTag };
