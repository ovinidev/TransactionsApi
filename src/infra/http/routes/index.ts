import { FastifyInstance } from "fastify";
import { CreateTransactionController } from "../controllers/CreateTransactionController";
import { FindTransactionsController } from "../controllers/FindTransactionsController";

export async function transactionRoutes(app: FastifyInstance) {
	const findTransactionsController = new FindTransactionsController();
	app.get("/", findTransactionsController.handle);

	const createTransactionController = new CreateTransactionController();
	app.post("/", createTransactionController.handle);
}
