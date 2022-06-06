const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../../app");
const { Tags } = require("../../frameworks/database/mongoDB/models/tags");

chai.use(chaiHttp);

describe("Test Tags Endpoint", () => {
	describe("/GET tags", () => {
		it("it should GET all the tags", (done) => {
			chai
				.request(app)
				.get("/api/v1/tags")
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
	describe("/GET tags details", () => {
		it("it should GET tags details by id", (done) => {
			let tags = new Tags({
				name: "New Tag",
			});

			tags.save((err, tags) => {
				chai
					.request(app)
					.get("/api/v1/tags/" + tags.id)
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
	describe("/GET tags details by slug", function () {
		it("It should get tag details by slug", (done) => {
			let newTag = new Tags({
				name: "New Tag",
			});

			newTag.save((err, newTag) => {
				chai
					.request(app)
					.get("/api/v1/tags/details/" + newTag.slug)
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res.body).to.be.an("Object");
						expect(res.body).to.have.property("code");
						expect(res.body.code).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body.status).to.equal("success");
						expect(res.body).to.have.property("message");
						expect(res.body.message).to.be.an("String");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("Object");
						expect(res.body.data.slug).to.be.an("String");
						expect(res.body.data.slug).to.equal(newTag.slug);
						done();
					});
			});
		});
	});
	describe("/POST new tags", function () {
		it("it should POST the new tags", (done) => {
			let tags = {
				name: "New Tag",
			};
			chai
				.request(app)
				.post("/api/v1/tags")
				.send(tags)
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
					expect(res.body.message).to.equal("Tag created successfully");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.be.an("object");
					expect(res.body.data).to.have.all.keys(
						"name",
						"news",
						"slug",
						"updatedAt",
						"updatedAt",
						"_id",
						"__v"
					);
					done();
				});
		});
	});
	describe("/DELETE tags by id", function () {
		it("it should DELETE the tags by id", (done) => {
			let tags = new Tags({
				name: "New Tag",
			});

			tags.save((err, tags) => {
				chai
					.request(app)
					.delete("/api/v1/tags/" + tags.id)
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
						expect(res.body.message).to.equal("Tag deleted successfully");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.null;
						done();
					});
			});
		});
	});
	describe("/PUT tags by id", function () {
		it("it should UPDATE the tags by id", (done) => {
			let tags = new Tags({
				name: "New Tag",
			});

			tags.save((err, tags) => {
				chai
					.request(app)
					.put("/api/v1/tags/" + tags.id)
					.send({
						name: "New Tag Updated",
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
						expect(res.body.message).to.equal("Tag updated successfully");
						expect(res.body).to.have.property("data");
            expect(res.body.data).to.be.a("object");
						expect(res.body.data.name).to.equal("New Tag Updated");
						done();
					});
			});
		});
	});
});
