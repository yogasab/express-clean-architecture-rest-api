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

	const findByID = (id) => {
		return Tags.findById(id).populate({
			path: "news",
			select: "title body author",
		});
	};

	return {
		findAll,
		findByID,
	};
}

module.exports = { tagsRepositoryMongoDB };
