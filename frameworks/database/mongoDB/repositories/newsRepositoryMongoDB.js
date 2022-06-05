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

		// Add news id on tags
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

	const deleteByID = async (id) => {
		const news = await News.findById(id);

		// Delete news id on tags
		if (news.tags.length > 0) {
			news.tags.forEach(async (tag) => {
				const tagID = tag;
				await Tags.findOneAndUpdate(tagID, {
					$pull: { news: news._id },
				});
			});
		}

		return await News.findByIdAndDelete(id);
	};

	const updateByID = async (id, newsEntity) => {
		const updatedNews = {
			title: newsEntity.getTitle(),
			body: newsEntity.getBody(),
			author: newsEntity.getAuthor(),
			tags: newsEntity.getTags(),
			status: newsEntity.getStatus(),
		};

		const news = await News.findById(id);

		news.tags.forEach(async (tag) => {
			const tagID = tag._id.toString();
			await Tags.findByIdAndUpdate(
				tagID,
				{
					$pull: { news: id },
				},
				{
					new: true,
					useFindAndModify: false,
				}
			);
		});

		newsEntity.getTags().forEach(async (tag) => {
			const tagID = tag;
			await Tags.findByIdAndUpdate(
				tagID,
				{
					$push: { news: id },
				},
				{
					new: true,
					useFindAndModify: false,
				}
			);
		});

		return await News.findByIdAndUpdate(id, updatedNews, { new: true });
	};

	const findByStatus = (status) => {
		return News.find({ status }).populate({
			path: "tags",
			select: "name createdAt slug",
		});
	};

	const findByTag = async (tag) => {
		const news = await Tags.find({ slug: tag }).populate({
			path: "news",
			select: "title body author status createdAt",
		});

		return news;
	};

	return {
		findAll,
		findByID,
		add,
		deleteByID,
		updateByID,
		findByStatus,
		findByTag,
	};
}

module.exports = { newsRepositoryMongoDB };
