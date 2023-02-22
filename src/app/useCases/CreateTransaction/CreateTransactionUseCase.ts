import { inject, injectable } from "tsyringe";
import { CreateTransactionDto } from "../../../infra/http/dtos/CreateTransaction";
import { Transaction } from "../../entities/Transaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";

@injectable()
export class CreateTransactionUseCase {
	constructor(
		@inject("TransactionRepository")
		private transactionRepository: TransactionRepository,
	) {}

	async execute({ amount, sessionId, title, type }: CreateTransactionDto) {
		const amountBasedOnType = type === "credit" ? amount : amount * -1;

		const transaction = new Transaction({
			id: "",
			amount: amountBasedOnType,
			sessionId,
			title,
			type,
		});

		return await this.transactionRepository.create(transaction);
	}
}
