const { News } = require("../models/news");
const { Tags } = require("../models/tags");

function newsRepositoryMongoDB() {
	const findAll = () => {
		return News.find()
			.populate({ path: "tags", select: "name slug" })
			.select("-__v");
	};

	const findByID = (id) => {
		const news = News.findById(id)
			.populate({ path: "tags", select: "name slug" })
			.select("-__v");
		return news;
	};

	return {
		findAll,
		findByID,
	};
}

module.exports = { newsRepositoryMongoDB };
