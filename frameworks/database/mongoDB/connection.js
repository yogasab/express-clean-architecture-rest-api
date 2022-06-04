function connection(mongoose, config, options) {
	function connectToMongoose() {
		mongoose
			.connect(config.mongo.uri)
			.then(() => console.log("Database connected successfully"))
			.catch((err) => console.log(err));
	}

	mongoose.connection.on("connected", () => {
		console.info("Connected to MongoDB!");
	});

	mongoose.connection.on("reconnected", () => {
		console.info("MongoDB reconnected!");
	});

	mongoose.connection.on("error", (error) => {
		console.error(`Error in MongoDb connection: ${error}`);
		mongoose.disconnect();
	});

	mongoose.connection.on("disconnected", () => {
		console.error(
			`MongoDB disconnected! Reconnecting in ${
				options.reconnectInterval / 1000
			}s...`
		);
		setTimeout(() => connectToMongo(), options.reconnectInterval);
	});

	return { connectToMongoose };
}

module.exports = { connection };
