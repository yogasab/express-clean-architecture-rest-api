const {
	tagsController,
} = require("../../../adapters/constollers/tagsController");
const {
	tagsRepository,
} = require("../../../application/repositories/tagsRepository");
const {
	tagsRepositoryMongoDB,
} = require("../../database/mongoDB/repositories/tagsRepositoryMongoDB");

function tagsRouter(express) {
	const tagsRouter = express.Router();

	const controller = tagsController(tagsRepository, tagsRepositoryMongoDB);

	tagsRouter.route("/").get(controller.getAllTags).post(controller.storeTag);
	tagsRouter
		.route("/:id")
		.get(controller.getTagByID)
		.put(controller.updateTag)
		.delete(controller.removeTagByID);
	tagsRouter.route("/details/:slug").get(controller.getTagBySlug);

	return tagsRouter;
}

module.exports = { tagsRouter };
