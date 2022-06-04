const { News } = require("../models/news");

function newsRepositoryMongoDB() {
	const findAll = () => {
		return News.find()
			.populate({ path: "tags", select: "name slug" })
			.select("-__v");
	};

	return {
		findAll,
	};
}

module.exports = { newsRepositoryMongoDB };