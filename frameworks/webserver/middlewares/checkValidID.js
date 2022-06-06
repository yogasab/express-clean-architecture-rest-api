const { default: mongoose } = require("mongoose");
const {
	responseFormatter,
} = require("../../../adapters/formatter/responseFormatter");

function checkValidID() {
	return function (req, res, next) {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			responseFormatter(res, 404, "failed", "Invalid ID, please try another");
		}

		return next();
	};
}

module.exports = { checkValidID };
