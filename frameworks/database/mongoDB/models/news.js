"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please file the title"],
			maxlength: [255, "The name must be between 3 - 255 characters"],
			minlength: [3, "The name must be between 3 - 255 characters"],
		},
		body: {
			type: String,
			required: [true, "Please file the body"],
			trim: true,
		},
		author: {
			type: String,
			required: [true, "Please file the author"],
			minlength: [2, "The name must be between 3 - 255 characters"],
		},
		status: {
			type: String,
			default: "draft",
			enum: ["draft", "publish", "deleted"],
		},
		tags: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Tags",
			},
		],
	},
	{
		timestamps: true,
	}
);

const News = mongoose.model("News", newsSchema);

module.exports = { News };
