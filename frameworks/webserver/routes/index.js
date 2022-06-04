const { newsRouter } = require("./newsRouter");

function routes(app, express) {
	app.use("/api/v1/news", newsRouter(express));
}

module.exports = { routes };
