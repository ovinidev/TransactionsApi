import { inject, injectable } from "tsyringe";
import { TransactionRepository } from "../repositories/TransactionRepository";

@injectable()
export class FindTransactionsSummaryUseCase {
	constructor(
		@inject("TransactionRepository")
		private transactionRepository: TransactionRepository,
	) {}

	async execute(sessionId: string) {
		return await this.transactionRepository.findSummary(sessionId);
	}
}
