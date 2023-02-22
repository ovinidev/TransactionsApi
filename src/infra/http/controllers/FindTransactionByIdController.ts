import { FastifyReply } from "fastify";
import { container } from "tsyringe";
import { FindTransactionByIdUseCase } from "../../../app/useCases/FindTransactionById/FindTransactionByIdUseCase";
import { handleError } from "../../errors/handleError";
import { TransactionViewModel } from "../viewModels/TransactionViewModel";

export class FindTransactionByIdController {
	async handle(req: any, res: FastifyReply) {
		try {
			const findTransactionByIdUseCase = container.resolve(
				FindTransactionByIdUseCase,
			);

			const { id } = req.params;

			const transaction = await findTransactionByIdUseCase.execute(id);

			return TransactionViewModel.toHTTP(transaction);
		} catch (err) {
			handleError({ err, res });
		}
	}
}
