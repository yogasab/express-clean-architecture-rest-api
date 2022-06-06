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

	const add = (tagsEntity) => {
		const newTag = new Tags({ name: tagsEntity.getName() });

		return newTag.save();
	};

	const update = (id, tagsEntity) => {
		const updatedTag = {
			name: tagsEntity.getName(),
		};

		updatedTag.slug = updatedTag.name.replace(/\s+/g, "-").toLowerCase();

		return Tags.findByIdAndUpdate(id, updatedTag, {
			new: true,
		});
	};

	return {
		findAll,
		findByID,
		findBySlug,
		add,
		update,
	};
}

module.exports = { tagsRepositoryMongoDB };
