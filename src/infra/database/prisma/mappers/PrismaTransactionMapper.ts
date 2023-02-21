import { Transaction } from "../../../../app/entities/Transaction";
import { Transaction as RawTransaction } from "@prisma/client";
import { CreateTransactionDto } from "../../../http/dtos/CreateTransaction";

export class PrismaTransactionMapper {
	static toPrisma(transaction: CreateTransactionDto) {
		return {
			title: transaction.title,
		};
	}

	static toDomain(raw: RawTransaction) {
		return new Transaction({
			title: raw.title,
			id: raw.id,
			createdAt: raw.created_at,
		});
	}
}