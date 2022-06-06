const {
	newsController,
} = require("../../../adapters/constollers/newsController");
const {
	newsRepository,
} = require("../../../application/repositories/newsRepository");
const {
	redisRepository,
} = require("../../../application/repositories/redisRepository");
const {
	newsRepositoryMongoDB,
} = require("../../../frameworks/database/mongoDB/repositories/newsRepositoryMongoDB");
const { RedisRepository } = require("../../database/redis/redisRepository");
const { checkValidID } = require("../middlewares/checkValidID");
const { redisCaching } = require("../middlewares/redisCaching");

function newsRouter(express, redis) {
	const newsRouter = express.Router();

	const controller = newsController(
		newsRepository,
		newsRepositoryMongoDB,
		redis,
		redisRepository,
		RedisRepository
	);

	newsRouter
		.route("/")
		.get(redisCaching(`news`, redis), controller.getAllNews)
		.post(controller.storeNews);

	newsRouter
		.route("/:id")
		.get(checkValidID(), redisCaching(`news`, redis), controller.getNewsByID)
		.delete(checkValidID(), controller.removeNewsByID)
		.put(checkValidID(), controller.updateNewsById);

	return newsRouter;
}

module.exports = { newsRouter };
