import { inject, injectable } from "tsyringe";
import { AppError } from "../errors/appError";
import { TransactionRepository } from "../repositories/TransactionRepository";

@injectable()
export class FindTransactionByIdUseCase {
	constructor(
		@inject("TransactionRepository")
		private transactionRepository: TransactionRepository,
	) {}

	async execute(id: string) {
		const transaction = await this.transactionRepository.findById(id);

		if (!transaction) throw new AppError("Transaction not found.", 404);

		return transaction;
	}
}
