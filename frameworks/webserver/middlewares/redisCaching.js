const {
	responseFormatter,
} = require("../../../adapters/formatter/responseFormatter");

function redisCaching(key, redis) {
	return function (req, res, next) {
		let params;
		params = "";
		if (Object.keys(req.params).length === 1) {
			if (Object.keys(req.params)[0] === "id") {
				params = req.params.id;
			} else {
				params = req.params.slug;
			}
		} else if (Object.keys(req.query).length === 1) {
			if (Object.keys(req.query)[0] === "tag") {
				params = req.query.tag;
			} else {
				params = req.query.status;
			}
		}

		redis.get(`${key}_${params}`, (err, data) => {
			if (err) {
				responseFormatter(
					res,
					400,
					"failed",
					"Failed to process request",
					null
				);
			}
			if (data) {
				responseFormatter(
					res,
					200,
					"success",
					"Data from redis fetched successfully",
					JSON.parse(data)
				);
			}
			return next();
		});
	};
}

module.exports = { redisCaching };
