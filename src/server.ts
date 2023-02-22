import "reflect-metadata";
import "./infra/http/container";
import fastify from "fastify";
import { transactionRoutes } from "./infra/http/routes";

const app = fastify();

app.register(transactionRoutes, {
	prefix: "transactions",
});

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP Server Running");
	});
