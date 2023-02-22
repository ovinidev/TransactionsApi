import { Transaction } from "../../../../app/entities/Transaction";
import {
	FindSummaryProps,
	TransactionRepository,
} from "../../../../app/repositories/TransactionRepository";
import { prisma } from "../services/prismaClient";
import { CreateTransactionDto } from "../../../http/dtos/CreateTransaction";
import { PrismaTransactionMapper } from "../mappers/PrismaTransactionMapper";

export class PrismaTransactionRepository implements TransactionRepository {
	async create(transaction: CreateTransactionDto): Promise<void> {
		const raw = PrismaTransactionMapper.toPrisma(transaction);

		await prisma.transaction.create({
			data: raw,
		});
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

	async delete(id: string): Promise<void> {
		await prisma.transaction.delete({
			where: {
				id,
			},
		});
	}
}
