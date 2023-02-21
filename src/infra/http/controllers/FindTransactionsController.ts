import { container } from "tsyringe";
import { FindTransactionsUseCase } from "../../../app/useCases/FindTransactionsUseCase";
import { TransactionViewModel } from "../viewModels/TransactionViewModel";

export class FindTransactionsController {
	async handle(req: any, res: any) {
		try {
			const findTransactionsUseCase = container.resolve(
				FindTransactionsUseCase,
			);

			const transactions = await findTransactionsUseCase.execute();

			return transactions.map((transaction) => {
				return TransactionViewModel.toHTTP(transaction);
			});
		} catch {
			res.status(400).send("error");
		}
	}
}
