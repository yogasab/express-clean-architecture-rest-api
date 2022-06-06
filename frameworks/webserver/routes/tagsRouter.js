const {
	tagsController,
} = require("../../../adapters/constollers/tagsController");
const {
	tagsRepository,
} = require("../../../application/repositories/tagsRepository");
const {
	tagsRepositoryMongoDB,
} = require("../../database/mongoDB/repositories/tagsRepositoryMongoDB");
const {
	redisRepository,
} = require("../../../application/repositories/redisRepository");
const { RedisRepository } = require("../../database/redis/redisRepository");
const { checkValidID } = require("../middlewares/checkValidID");
const { redisCaching } = require("../middlewares/redisCaching");

function tagsRouter(express, redis) {
	const tagsRouter = express.Router();

	const controller = tagsController(
		tagsRepository,
		tagsRepositoryMongoDB,
		redis,
		redisRepository,
		RedisRepository
	);

	tagsRouter
		.route("/")
		.get(redisCaching(`tags`, redis), controller.getAllTags)
		.post(controller.storeTag);
	tagsRouter
		.route("/:id")
		.get(checkValidID(), redisCaching(`tags`, redis), controller.getTagByID)
		.put(checkValidID(), controller.updateTag)
		.delete(checkValidID(), controller.removeTagByID);
	tagsRouter
		.route("/details/:slug")
		.get(redisCaching(`tags`, redis), controller.getTagBySlug);

	return tagsRouter;
}

module.exports = { tagsRouter };
