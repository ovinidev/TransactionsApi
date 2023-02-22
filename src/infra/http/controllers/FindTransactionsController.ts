import { FastifyReply } from "fastify";
import { container } from "tsyringe";
import { FindTransactionsUseCase } from "../../../app/useCases/FindTransactionsUseCase";
import { handleError } from "../../errors/handleError";
import { TransactionViewModel } from "../viewModels/TransactionViewModel";

export class FindTransactionsController {
	async handle(req: any, res: FastifyReply) {
		try {
			const findTransactionsUseCase = container.resolve(
				FindTransactionsUseCase,
			);

			const { sessionId } = req.cookies;

			const transactions = await findTransactionsUseCase.execute(sessionId);

			return transactions.map((transaction) => {
				return TransactionViewModel.toHTTP(transaction);
			});
		} catch (err) {
			handleError({ err, res });
		}
	}
}
