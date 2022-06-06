const { tags } = require("../../../src/entities/tags");

function updateTagByID({ id, name, tagsRepository }) {
	if (!name) {
		throw new Error("Please fill the required field");
	}

	const updatedTags = tags({ name });

	return tagsRepository.updateTagByID(id, updatedTags);
}

module.exports = { updateTagByID };
