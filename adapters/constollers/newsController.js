const { findAllNews } = require("../../application/use_cases/news/findAllNews");
const {
	findNewsByID,
} = require("../../application/use_cases/news/findNewsByID");
const { responseFormatter } = require("../formatter/responseFormatter");

function newsController(newsDBRepository, newsDBRepositoryImpl) {
	const dbRepository = newsDBRepository(newsDBRepositoryImpl());

	const getAllNews = async (req, res) => {
		try {
			const news = await findAllNews(dbRepository);
			responseFormatter(res, 200, "success", "News fetched successfully", news);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const getNewsByID = async (req, res) => {
		const { id } = req.params;
		try {
			const news = await findNewsByID(id, dbRepository);
			if (!news) {
				responseFormatter(res, 404, "failed", "News not found", null);
			}
			responseFormatter(res, 200, "success", "News fetched successfully", news);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	return {
		getAllNews,
		getNewsByID,
	};
}

module.exports = { newsController };
