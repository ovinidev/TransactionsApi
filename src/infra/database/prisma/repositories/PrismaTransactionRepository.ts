import { Transaction } from "../../../../app/entities/Transaction";
import {
	FindSummaryProps,
	TransactionRepository,
} from "../../../../app/repositories/TransactionRepository";
import { prisma } from "../services/prismaClient";
import { PrismaTransactionMapper } from "../mappers/PrismaTransactionMapper";

export class PrismaTransactionRepository implements TransactionRepository {
	async create(transaction: Transaction): Promise<Transaction> {
		const raw = PrismaTransactionMapper.toPrisma(transaction);

		const transactionCreated = await prisma.transaction.create({
			data: raw,
		});

		return PrismaTransactionMapper.toDomain(transactionCreated);
	}

	async findAll(sessionId: string): Promise<Transaction[]> {
		const transactions = await prisma.transaction.findMany({
			where: {
				session_id: sessionId,
			},
		});

		return transactions.map((transaction) => {
			return PrismaTransactionMapper.toDomain(transaction);
		});
	}

	async findById(id: string): Promise<Transaction | null> {
		const transaction = await prisma.transaction.findUnique({
			where: {
				id,
			},
		});

		if (!transaction) return null;

		return PrismaTransactionMapper.toDomain(transaction);
	}

	async findSummary(sessionId: string): Promise<FindSummaryProps> {
		const summaryTransactionsAmount = await prisma.transaction.aggregate({
			where: {
				session_id: sessionId,
			},
			_sum: {
				amount: true,
			},
		});

		return summaryTransactionsAmount._sum;
	}
}
