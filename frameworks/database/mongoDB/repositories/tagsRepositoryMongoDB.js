const { News } = require("../models/news");
const { Tags } = require("../models/tags");

function tagsRepositoryMongoDB() {
	const findAll = () => {
		return Tags.find()
			.populate({
				path: "news",
				select: "title body author",
			})
			.select("-__v -updatedAt");
	};

	return {
		findAll,
	};
}

module.exports = { tagsRepositoryMongoDB };
