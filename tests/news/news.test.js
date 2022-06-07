const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../app");
const { Tags } = require("../../frameworks/database/mongoDB/models/tags");
const { News } = require("../../frameworks/database/mongoDB/models/news");

chai.use(chaiHttp);

describe("Test News Endpoint", () => {
	// Created a new tag
	const newTag = new Tags({ name: "Invesment" });
	newTag.save((err, tag) => {
		if (err) {
			console.log(err);
		}
	});
	const tagID = newTag._id.toString();

	let newNews = new News({
		title: "Personal title news",
		author: "Personal title author",
		body: "how to start investment body",
		tags: [tagID],
	});
	describe("/POST new news", function () {
		it("it should POST the new news", (done) => {
			chai
				.request(app)
				.post("/api/v1/news")
				.send(newNews)
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.be.a("number");
					expect(res.body.code).to.equal(201);
					expect(res.body).to.be.an("object");
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.be.a("string");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.equal("News created successfully");
					expect(res.body.message).to.be.a("string");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.be.an("object");
					expect(res.body.data).to.have.all.keys(
						"title",
						"body",
						"author",
						"status",
						"tags",
						"updatedAt",
						"updatedAt",
						"_id",
						"__v"
					);
					done();
				});
		});
	});
	describe("/GET news from the database", () => {
		it("it should GET all the news from the database", (done) => {
			chai
				.request(app)
				.get("/api/v1/news")
				.end((err, res) => {
					expect(err).to.be.null;
					console.log(res.body.message);
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.equal("News fetched successfully");
					expect(res.body.message).to.have.an("string");
					expect(res.body).to.have.property("data");
					done();
				});
		});
	});
	describe("/GET news from redis", () => {
		it("it should GET all the news from redis", (done) => {
			chai
				.request(app)
				.get("/api/v1/news")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.have.an("string");
					expect(res.body.message).to.equal(
						"Data from redis fetched successfully"
					);
					expect(res.body).to.have.property("data");
					done();
				});
		});
	});
	describe("/GET news filtering by status from the database", () => {
		it("It should GET all news filtered by status from the database", (done) => {
			chai
				.request(app)
				.get("/api/v1/news?status=draft")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.have.an("string");
					expect(res.body.message).to.equal(
						"News by status fetched successfully"
					);
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news filtering by status from redis", () => {
		it("It should GET all news filtered by status from redis", (done) => {
			chai
				.request(app)
				.get("/api/v1/news?status=draft")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.have.an("string");
					expect(res.body.message).to.equal(
						"Data from redis fetched successfully"
					);
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news filtering by topics/tags from the database", () => {
		it("It should GET all news filtered by topics/tags from the database", (done) => {
			chai
				.request(app)
				.get("/api/v1/news?tag=Invesment")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.have.an("string");
					expect(res.body.message).to.equal("News by tag fetched successfully");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news filtering by topics/tags from redis", () => {
		it("It should GET all news filtered by topics/tags from redis", (done) => {
			chai
				.request(app)
				.get("/api/v1/news?tag=Invesment")
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.have.an("string");
					expect(res.body.message).to.equal(
						"Data from redis fetched successfully"
					);
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news details from the database", () => {
		it("it should GET all the news details by id from the database", (done) => {
			newNews.save((err, newNews) => {
				chai
					.request(app)
					.get("/api/v1/news/" + newNews.id)
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res.body).to.be.an("Object");
						expect(res.body).to.have.property("code");
						expect(res.body.code).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body.status).to.equal("success");
						expect(res.body).to.have.property("message");
						expect(res.body.message).to.have.an("string");
						expect(res.body.message).to.equal("News fetched successfully");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.have.an("object");
						done();
					});
			});
		});
	});
	describe("/GET news details from redis", () => {
		it("it should GET all the news details by id from redis", (done) => {
			newNews.save((err, newNews) => {
				chai
					.request(app)
					.get("/api/v1/news/" + newNews.id)
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res.body).to.be.an("Object");
						expect(res.body).to.have.property("code");
						expect(res.body.code).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body.status).to.equal("success");
						expect(res.body).to.have.property("message");
						expect(res.body.message).to.have.an("string");
						expect(res.body.message).to.equal(
							"Data from redis fetched successfully"
						);
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.have.an("object");
						done();
					});
			});
		});
	});
	describe("/DELETE news by id", function () {
		it("it should DELETE the news by id", (done) => {
			// Created a new tag
			const tags = new Tags({ name: "Invesment" });
			tags.save((err, tag) => {
				if (err) {
					console.log(err);
				}
			});
			const tagID = tags._id.toString();
			let news = new News({
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: [tagID],
			});
			news.save((err, news) => {
				chai
					.request(app)
					.delete("/api/v1/news/" + news.id)
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res.body).to.have.property("code");
						expect(res.body.code).to.be.a("number");
						expect(res.body.code).to.equal(200);
						expect(res.body).to.be.an("object");
						expect(res.body).to.have.property("status");
						expect(res.body.status).to.be.a("string");
						expect(res.body.status).to.equal("success");
						expect(res.body).to.have.property("message");
						expect(res.body.message).to.be.a("string");
						expect(res.body.message).to.equal("News deleted successfully");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.null;
						done();
					});
			});
		});
	});
	describe("/PUT news by id", function () {
		it("it should UPDATE the news by id", (done) => {
			// Created a new tag
			const tags = new Tags({ name: "Invesment" });
			tags.save((err, tag) => {
				if (err) {
					console.log(err);
				}
			});
			const tagID = tags._id.toString();
			let news = new News({
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: [tagID],
			});
			news.save((err, news) => {
				chai
					.request(app)
					.put("/api/v1/news/" + news.id)
					.send({
						title: "Personal title news updated",
						author: "Personal title author updated",
						body: "how to start investment body updated",
						tags: [tagID],
					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res.body).to.have.property("code");
						expect(res.body.code).to.be.a("number");
						expect(res.body.code).to.equal(200);
						expect(res.body).to.be.an("object");
						expect(res.body).to.have.property("status");
						expect(res.body.status).to.be.a("string");
						expect(res.body.status).to.equal("success");
						expect(res.body).to.have.property("message");
						expect(res.body.message).to.be.a("string");
						expect(res.body.message).to.equal("News updated successfully");
						expect(res.body).to.have.property("data");
						expect(res.body).to.have.property("data");
						expect(res.body.data.title).to.equal("Personal title news updated");
						expect(res.body.data.author).to.equal(
							"Personal title author updated"
						);
						expect(res.body.data.body).to.equal(
							"how to start investment body updated"
						);
						done();
					});
			});
		});
	});
});
