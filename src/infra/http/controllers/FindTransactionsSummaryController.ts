import { FastifyReply } from "fastify";
import { container } from "tsyringe";
import { FindTransactionsSummaryUseCase } from "../../../app/useCases/FindTransactionsSummary/FindTransactionsSummaryUseCase";
import { handleError } from "../../errors/handleError";

export class FindTransactionsSummaryController {
	async handle(req: any, res: FastifyReply) {
		try {
			const findTransactionsSummaryUseCase = container.resolve(
				FindTransactionsSummaryUseCase,
			);

			const { sessionId } = req.cookies;

			const transaction = await findTransactionsSummaryUseCase.execute(
				sessionId,
			);

			return transaction;
		} catch (err) {
			handleError({ err, res });
		}
	}
}
