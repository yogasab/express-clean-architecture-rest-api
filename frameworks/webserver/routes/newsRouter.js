const {
	newsController,
} = require("../../../adapters/constollers/newsController");
const {
	newsRepository,
} = require("../../../application/repositories/newsRepository");
const {
	newsRepositoryMongoDB,
} = require("../../../frameworks/database/mongoDB/repositories/newsRepositoryMongoDB");

function newsRouter(express) {
	const newsRouter = express.Router();

	const controller = newsController(newsRepository, newsRepositoryMongoDB);

	newsRouter.route("/").get(controller.getAllNews).post(controller.storeNews);
	newsRouter.route("/:id").get(controller.getNewsByID).delete(controller.removeNewsByID);

	return newsRouter;
}

module.exports = { newsRouter };