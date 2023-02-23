import { FastifyInstance } from "fastify";
import { CreateTransactionController } from "../controllers/CreateTransactionController";
import { FindTransactionByIdController } from "../controllers/FindTransactionByIdController";
import { FindTransactionsController } from "../controllers/FindTransactionsController";
import { FindTransactionsSummaryController } from "../controllers/FindTransactionsSummaryController";
import { checkSessionIdExist } from "../middlewares/checkSessionIdExist";

export async function transactionRoutes(app: FastifyInstance) {
	const createTransactionController = new CreateTransactionController();
	app.post("/", createTransactionController.handle);

	const findTransactionsController = new FindTransactionsController();
	app.get(
		"/",
		{ preHandler: [checkSessionIdExist] },
		findTransactionsController.handle,
	);

	const findTransactionByIdController = new FindTransactionByIdController();
	app.get(
		"/:id",
		{ preHandler: [checkSessionIdExist] },
		findTransactionByIdController.handle,
	);

	const findTransactionSummaryController =
		new FindTransactionsSummaryController();
	app.get(
		"/summary",
		{ preHandler: [checkSessionIdExist] },
		findTransactionSummaryController.handle,
	);
}
