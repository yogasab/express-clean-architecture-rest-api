const { news } = require("../../../../src/entities/news");
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
		if (newsEntity.getTags().length === 0) {
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
			return await News.findByIdAndUpdate(id, updatedNews, { new: true });
		}

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

	return {
		findAll,
		findByID,
		add,
		deleteByID,
		updateByID,
	};
}

module.exports = { newsRepositoryMongoDB };
