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

	const add = async (newsEntity) => {
		const data = new News({
			title: newsEntity.getTitle(),
			body: newsEntity.getBody(),
			author: newsEntity.getAuthor(),
			tags: newsEntity.getTags(),
			status: newsEntity.getStatus(),
		});

		const newNews = await data.save();

		if (newNews.tags.length > 0) {
			newNews.tags.forEach(async (tag) => {
				const tagID = tag;
				await Tags.findByIdAndUpdate(
					tagID,
					{
						$push: { news: newNews._id },
					},
					{ new: true, useFindAndModify: false }
				);
			});
		}

		return newNews;
	};

	return {
		findAll,
		findByID,
		add,
	};
}

module.exports = { newsRepositoryMongoDB };
