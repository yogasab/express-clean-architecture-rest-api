"use strict";

const responseFormatter = (
	res,
	code = 200,
	status = "success",
	message = null,
	data = null
) => {
	return res.status(code).json({
		code,
		status,
		message,
		data,
	});
};

module.exports = { responseFormatter };
