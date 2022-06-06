function redisConnection(Redis) {
	const createRedisClient = function createRedisClient() {
		return new Redis();
	};

	return {
		createRedisClient,
	};
}

module.exports = { redisConnection };
