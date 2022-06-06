module.exports = {
	port: process.env.PORT || 5000,
	ip: process.env.HOST || "0.0.0.0",
	mongo: {
		uri:
			process.env.MONGODB_URL ||
			"mongodb://localhost:27017/test-be-bareksa-test",
	},
	redis: {
		uri: process.env.REDIS_URL || "redis://localhost:6379",
	},
};
