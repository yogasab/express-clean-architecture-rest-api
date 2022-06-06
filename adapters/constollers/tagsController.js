const { findAllTags } = require("../../application/use_cases/tags/findAllTags");
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

	return {
		getAllTags,
	};
}

module.exports = { tagsController };
