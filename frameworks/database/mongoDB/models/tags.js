"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagsSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please file the name"],
			maxlength: [255, "The name must be between 3 - 255 characters"],
			minlength: [3, "The name must be between 3 - 255 characters"],
		},
		slug: {
			type: String,
		},
		news: [
			{
				type: mongoose.Types.ObjectId,
				ref: "News",
			},
		],
	},
	{
		timestamps: true,
	}
);

tagsSchema.pre("save", function (next) {
	this.slug = this.name.replace(/\s+/g, "-").toLowerCase();
	next();
});

const Tags = mongoose.model("Tags", tagsSchema);

module.exports = { Tags };
