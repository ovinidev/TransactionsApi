import { inject, injectable } from "tsyringe";
import { CreateTransactionDto } from "../../infra/http/dtos/CreateTransaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

@injectable()
export class CreateTransactionUseCase {
	constructor(
		@inject("TransactionRepository")
		private transactionRepository: TransactionRepository,
	) {}

	async execute(transaction: CreateTransactionDto) {
		return await this.transactionRepository.create(transaction);
	}
}
