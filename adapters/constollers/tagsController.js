const { addTag } = require("../../application/use_cases/tags/addTag");
const {
	deleteTagByID,
} = require("../../application/use_cases/tags/deleteTagByID");
const { findAllTags } = require("../../application/use_cases/tags/findAllTags");
const { findTagByID } = require("../../application/use_cases/tags/findTagByID");
const {
	findTagBySlug,
} = require("../../application/use_cases/tags/findTagBySlug");
const {
	updateTagByID,
} = require("../../application/use_cases/tags/updateTagByID");
const { responseFormatter } = require("../formatter/responseFormatter");

function tagsController(
	tagsDBRepository,
	tagsDBRepositoryImpl,
	redisCaching,
	redisCachingRepository,
	redisCachingRepositoryImpl
) {
	const dbRepository = tagsDBRepository(tagsDBRepositoryImpl());
	const redisRepository = redisCachingRepository(
		redisCachingRepositoryImpl()(redisCaching)
	);

	const getAllTags = async (req, res) => {
		try {
			const tags = await findAllTags(dbRepository);
			redisRepository.setCache(`tags_`, JSON.stringify(tags));
			responseFormatter(res, 200, "success", "Tags fetched successfully", tags);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const getTagByID = async (req, res) => {
		const { id } = req.params;
		try {
			const tags = await findTagByID(id, dbRepository);
			if (!tags) {
				responseFormatter(res, 404, "failed", "Tag not found", null);
			}

			redisRepository.setCache(`tags_${id}`, JSON.stringify(tags));
			responseFormatter(res, 200, "success", "Tag fetched successfully", tags);
		} catch (error) {
			console.log(error);
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const getTagBySlug = async (req, res) => {
		const { slug } = req.params;
		try {
			const tag = await findTagBySlug(slug, dbRepository);
			if (!tag) {
				responseFormatter(res, 404, "failed", "Tag not found", null);
			}

			redisRepository.setCache(`tags_${slug}`, JSON.stringify(tag));
			responseFormatter(res, 200, "success", "Tag fetched successfully", tag);
		} catch (error) {
			console.log(error);
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const storeTag = async (req, res) => {
		const { name } = req.body;
		try {
			const newTags = await addTag({
				name,
				tagsRepository: dbRepository,
			});
			responseFormatter(
				res,
				201,
				"success",
				"Tag created successfully",
				newTags
			);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const updateTag = async (req, res) => {
		const { name } = req.body;
		const { id } = req.params;
		try {
			const updatedTag = await updateTagByID({
				id,
				name,
				tagsRepository: dbRepository,
			});
			responseFormatter(
				res,
				200,
				"success",
				"Tag updated successfully",
				updatedTag
			);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const removeTagByID = async (req, res) => {
		const { id } = req.params;
		try {
			const tag = await deleteTagByID(id, dbRepository);
			if (!tag) {
				responseFormatter(res, 404, "failed", "Tag not found", null);
			}
			responseFormatter(res, 200, "success", "Tag deleted successfully", null);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	return {
		getAllTags,
		getTagByID,
		getTagBySlug,
		storeTag,
		updateTag,
		removeTagByID,
	};
}

module.exports = { tagsController };
