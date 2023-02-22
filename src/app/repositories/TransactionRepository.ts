import { CreateTransactionDto } from "../../infra/http/dtos/CreateTransaction";
import { Transaction } from "../entities/Transaction";

export interface FindSummaryProps {
	amount: number | null;
}

export abstract class TransactionRepository {
	abstract create(transaction: CreateTransactionDto): Promise<void>;
	abstract findAll(sessionId: string): Promise<Transaction[]>;
	abstract findById(id: string): Promise<Transaction | null>;
	abstract findSummary(sessionId: string): Promise<FindSummaryProps>;
	abstract delete(id: string): Promise<void>;
}
