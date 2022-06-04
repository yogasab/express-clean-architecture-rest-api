const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../app");
const News = require("../../app/models/news.models");

chai.use(chaiHttp);

describe("Test News Endpoint", () => {
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
					expect(res.body.message).to.equal("Data fetched successfully");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.have.key("news");
					expect(res.body.data.news).to.have.an("array");
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
					console.log(res.body);
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.be.an("Object");
					expect(res.body).to.have.property("code");
					expect(res.body.code).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body.status).to.equal("success");
					expect(res.body).to.have.property("message");
					expect(res.body.message).to.equal("Data fetched successfully");
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
					expect(res.body.message).to.equal("Data fetched successfully");
					expect(res.body.data).to.have.an("array");
					done();
				});
		});
	});
	describe("/GET news details", () => {
		it("it should GET all the news details by id", (done) => {
			let news = new News({
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: ["6285d605e225a23c01acb331"],
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
						expect(res.body.message).to.equal("News fetched successfully");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.have.key("news");
						expect(res.body.data.news).to.have.an("object");
						done();
					});
			});
		});
	});
	describe("/POST new news", function () {
		it("it should POST the new news", (done) => {
			let news = {
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: ["6285d605e225a23c01acb331"],
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
					expect(res.body.message).to.equal("News created successfully");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.be.an("object");
					expect(res.body.data.newNews).to.be.an("object");
					expect(res.body.data.newNews).to.have.all.keys(
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
	describe("/DELETE news by id", function () {
		it("it should DELETE the news by id", (done) => {
			let news = new News({
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: ["6285d605e225a23c01acb331"],
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
			let news = new News({
				title: "Personal title news",
				author: "Personal title author",
				body: "how to start investment body",
				tags: ["6285d605e225a23c01acb331"],
			});

			news.save((err, news) => {
				chai
					.request(app)
					.put("/api/v1/news/" + news.id)
					.send({
						title: "Personal title news updated",
						author: "Personal title author updated",
						body: "how to start investment body updated",
						tags: ["6285d605e225a23c01acb331"],
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
						expect(res.body.data).to.have.property("updatedNews");
						expect(res.body.data.updatedNews.title).to.equal(
							"Personal title news updated"
						);
						expect(res.body.data.updatedNews.author).to.equal(
							"Personal title author updated"
						);
						expect(res.body.data.updatedNews.body).to.equal(
							"how to start investment body updated"
						);
						done();
					});
			});
		});
	});
});
