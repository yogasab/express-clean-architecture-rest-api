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

	newsRouter.route("/").get(controller.getAllNews);

	return newsRouter;
}

module.exports = { newsRouter };
