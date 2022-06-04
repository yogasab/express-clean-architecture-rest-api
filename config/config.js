module.exports = {
	port: process.env.PORT || 5000,
	ip: process.env.HOST || "0.0.0.0",
	mongo: {
		uri: process.env.MONGO_URL || "mongodb://localhost:27017/test-be-bareksa",
	},
	redis: {
		uri: process.env.REDIS_URL || "redis://localhost:6379",
	},
};
