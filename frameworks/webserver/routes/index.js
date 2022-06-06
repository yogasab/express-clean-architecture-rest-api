const { newsRouter } = require("./newsRouter");
const { tagsRouter } = require("./tagsRouter");

function routes(app, express) {
	app.use("/api/v1/news", newsRouter(express));
	app.use("/api/v1/tags", tagsRouter(express));
}

module.exports = { routes };
