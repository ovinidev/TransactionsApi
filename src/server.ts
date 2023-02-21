import "reflect-metadata";
import "./infra/http/container";
import fastify from "fastify";
import { FindTransactionsController } from "./infra/http/controllers/FindTransactionsController";
import { CreateTransactionController } from "./infra/http/controllers/CreateTransactionController";

const app = fastify();

const findTransactionsController = new FindTransactionsController();
app.get("/transactions", findTransactionsController.handle);

const createTransactionController = new CreateTransactionController();
app.post("/transactions", createTransactionController.handle);

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP Server Running");
	});
