function RedisRepository() {
	return function cachingClient(redis) {
		const setCache = (key, data) => {
			redis.set(key, data);
		};

		return {
			setCache,
		};
	};
}

module.exports = { RedisRepository };
