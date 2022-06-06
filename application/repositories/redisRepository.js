function redisRepository(repository) {
	const setCache = (key, data) => repository.setCache(key, data);

	return {
		setCache,
	};
}

module.exports = { redisRepository };
