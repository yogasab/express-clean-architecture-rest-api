const { newsRouter } = require("./newsRouter");
const { tagsRouter } = require("./tagsRouter");

function routes(app, express, redis) {
	app.use("/api/v1/news", newsRouter(express, redis));
	app.use("/api/v1/tags", tagsRouter(express));
}

module.exports = { routes };
