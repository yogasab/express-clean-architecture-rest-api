const express = require("express");
const morgan = require("morgan");
const { connectDB } = require("./app/config/db");
const app = express();
const routes = require("./app/routes");
const PORT = process.env.PORT || 5000;

connectDB();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

routes.init(app);

app.get("/", (req, res) => {
	res.status(200).json({
		code: 200,
		status: "200",
		message: "Technical Test BE Sejuta Cita",
	});
});

app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "Failed",
		message: `The routes for ${req.originalUrl} is not found`,
	});
});

app.listen(PORT, () => {
	console.log("Server runnging on localhost:5000");
});

module.exports = app;
