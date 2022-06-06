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

	const findBySlug = (slug) => {
		return Tags.findOne({ slug })
			.select("news name")
			.populate({ path: "news", select: "-__v -tags" });
	};

	return {
		findAll,
		findByID,
		findBySlug,
	};
}

module.exports = { tagsRepositoryMongoDB };
