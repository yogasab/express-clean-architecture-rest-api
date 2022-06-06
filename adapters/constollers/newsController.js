const { findAllNews } = require("../../application/use_cases/news/findAllNews");
const {
	findNewsByID,
} = require("../../application/use_cases/news/findNewsByID");
const { addNews } = require("../../application/use_cases/news/addNews");
const {
	deleteNewsByID,
} = require("../../application/use_cases/news/deleteNewsByID");
const { responseFormatter } = require("../formatter/responseFormatter");
const {
	updateNewsByID,
} = require("../../application/use_cases/news/updateNewsByID");
const {
	findNewsByStatus,
} = require("../../application/use_cases/news/findNewsByStatus");
const {
	findNewsByTag,
} = require("../../application/use_cases/news/findByNewsTag");

function newsController(
	newsDBRepository,
	newsDBRepositoryImpl,
	cachingClient,
	redisCachingRepository,
	redisCachingRepositoryImpl
) {
	const dbRepository = newsDBRepository(newsDBRepositoryImpl());
	const redisRepository = redisCachingRepository(
		redisCachingRepositoryImpl()(cachingClient)
	);

	const getAllNews = async (req, res) => {
		const { status, tag } = req.query;
		try {
			if (status) {
				const news = await findNewsByStatus(status, dbRepository);
				if (news.length === 0) {
					responseFormatter(res, 404, "failed", "News not found", null);
				}

				redisRepository.setCache(`news_${status}`, JSON.stringify(news));
				responseFormatter(
					res,
					200,
					"success",
					"News by status fetched successfully",
					news
				);
			} else if (tag) {
				const news = await findNewsByTag(tag, dbRepository);
				if (news.length === 0) {
					responseFormatter(res, 404, "failed", "News not found", null);
				}

				redisRepository.setCache(`news_${tag}`, JSON.stringify(news));
				responseFormatter(
					res,
					200,
					"success",
					"News by tag fetched successfully",
					news
				);
			}

			const news = await findAllNews(dbRepository);
			redisRepository.setCache(`news_`, JSON.stringify(news));
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
			redisRepository.setCache(`news_${id}`, JSON.stringify(news));
			responseFormatter(res, 200, "success", "News fetched successfully", news);
		} catch (error) {
			console.log(error);
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const storeNews = async (req, res) => {
		const { title, body, author, status, tags } = req.body;
		try {
			const newNews = await addNews({
				title,
				body,
				author,
				tags,
				status,
				newsRepository: dbRepository,
			});
			responseFormatter(
				res,
				201,
				"success",
				"News created successfully",
				newNews
			);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const removeNewsByID = async (req, res) => {
		const { id } = req.params;
		try {
			const news = await deleteNewsByID(id, dbRepository);
			if (!news) {
				responseFormatter(res, 404, "failed", "News not found", null);
			}
			responseFormatter(res, 200, "success", "News deleted successfully", null);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	const updateNewsById = async (req, res) => {
		const { title, body, author, status, tags } = req.body;
		const { id } = req.params;
		try {
			const updatedNews = await updateNewsByID({
				id,
				title,
				body,
				author,
				tags,
				status,
				newsRepository: dbRepository,
			});
			responseFormatter(
				res,
				200,
				"success",
				"News updated successfully",
				updatedNews
			);
		} catch (error) {
			responseFormatter(res, 500, "error", error.message, null);
		}
	};

	return {
		getAllNews,
		getNewsByID,
		storeNews,
		removeNewsByID,
		updateNewsById,
	};
}

module.exports = { newsController };
