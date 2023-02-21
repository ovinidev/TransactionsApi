import { CreateTransactionDto } from "../../infra/http/dtos/CreateTransaction";
import { Transaction } from "../entities/Transaction";

export abstract class TransactionRepository {
	abstract findAll(): Promise<Transaction[]>;
	abstract findById(id: string): Promise<Transaction | null>;
	abstract create(transaction: CreateTransactionDto): Promise<void>;
	abstract delete(id: string): Promise<void>;
}
