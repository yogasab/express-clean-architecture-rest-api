const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
// const Redis = require("ioredis");
const { expressConfig } = require("./frameworks/webserver/express");
const { routes } = require("./frameworks/webserver/routes");
const { serverConfig } = require("./frameworks/webserver/server");
const { connection } = require("./frameworks/database/mongoDB/connection");
// const { redisConnection } = require("./frameworks/database/redis/connection");

const app = express();

const server = require("http").createServer(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
connection(mongoose, config, {
	autoIndex: false,
	useCreateIndex: true,
	useNewUrlParser: true,
	autoReconnect: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 10000,
	keepAlive: 120,
	connectTimeoutMS: 1000,
}).connectToMongoose();

// / express.js configuration (middlewares etc.)
expressConfig(app);

// const redisClient = redisConnection(Redis).createRedisClient();

// routes for each endpoint
routes(app, express);

// error handling middleware
// app.use(errorHandlingMiddleware);

// Expose app
module.exports = { app };
