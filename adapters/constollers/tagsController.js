const { findAllTags } = require("../../application/use_cases/tags/findAllTags");
const { findTagByID } = require("../../application/use_cases/tags/findTagByID");
const { responseFormatter } = require("../formatter/responseFormatter");

function tagsController(tagsDBRepository, tagsDBRepositoryImpl) {
	const dbRepository = tagsDBRepository(tagsDBRepositoryImpl());

	const getAllTags = async (req, res) => {
		try {
			const tags = await findAllTags(dbRepository);
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
			responseFormatter(res, 200, "success", "Tag fetched successfully", tags);
		} catch (error) {
			console.log(error);
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	return {
		getAllTags,
		getTagByID,
	};
}

module.exports = { tagsController };
