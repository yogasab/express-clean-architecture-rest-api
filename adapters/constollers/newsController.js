const { findAllNews } = require("../../application/use_cases/news/findAllNews");
const { responseFormatter } = require("../formatter/responseFormatter");

function newsController(newsDBRepository, newsDBRepositoryImpl) {
	const dbRepository = newsDBRepository(newsDBRepositoryImpl());

	const getAllNews = async (req, res) => {
		try {
			const news = await findAllNews(dbRepository);
			responseFormatter(res, 200, "success", "News fetched successfully", news);
		} catch (error) {
			console.log(error);
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	return {
		getAllNews,
	};
}

module.exports = { newsController };
