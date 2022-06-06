const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../app");
const { Tags } = require("../../frameworks/database/mongoDB/models/tags");
const { News } = require("../../frameworks/database/mongoDB/models/news");

chai.use(chaiHttp);

describe("Test News Endpoint", () => {
	describe("/POST new news", function () {
		it("it should POST the new news", (done) => {
			// Created a new tag
			const tags = new Tags({ name: "Invesment" });
			tags.save((err, tag) => {
				if (err) {
					console.log(err);
				}
			});
			const tagID = tags._id.toString();

			let news = {
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: [tagID],
			};
			chai
				.request(app)
				.post("/api/v1/news")
				.send(news)
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
	describe("/GET news", () => {
		it("it should GET all the news", (done) => {
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
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news filtering by status", () => {
		it("It should GET all news filtered by status", (done) => {
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
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news filtering by topics/tags", () => {
		it("It should GET all news filtered by topics/tags", (done) => {
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
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news details", () => {
		it("it should GET all the news details by id", (done) => {
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
					.get("/api/v1/news/" + news.id)
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
