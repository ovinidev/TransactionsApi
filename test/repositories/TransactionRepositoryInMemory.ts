import { Transaction } from "../../src/app/entities/Transaction";
import {
	FindSummaryProps,
	TransactionRepository,
} from "../../src/app/repositories/TransactionRepository";

export class TransactionRepositoryInMemory implements TransactionRepository {
	transactions: Transaction[] = [];

	async create(transaction: Transaction): Promise<Transaction> {
		this.transactions.push(transaction);

		return transaction;
	}

	async findAll(sessionId: string): Promise<Transaction[]> {
		return this.transactions.filter(
			(transaction) => transaction.props.sessionId === sessionId,
		);
	}

	async findById(id: string): Promise<Transaction | null> {
		const transaction = this.transactions.find(
			(transaction) => transaction.props.id === id,
		);

		if (!transaction) return null;

		return transaction;
	}

	async findSummary(sessionId: string): Promise<FindSummaryProps> {
		const transactionsSummary = this.transactions.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0);

		return { amount: transactionsSummary };
	}
}
