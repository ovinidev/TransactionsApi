import { Transaction } from "../../../../app/entities/Transaction";
import { Transaction as RawTransaction } from "@prisma/client";

export class PrismaTransactionMapper {
	static toPrisma(transaction: Transaction) {
		return {
			title: transaction.props.title,
			amount: transaction.props.amount,
			type: transaction.props.type,
			session_id: transaction.props.sessionId,
		};
	}

	static toDomain(raw: RawTransaction) {
		return new Transaction({
			title: raw.title,
			id: raw.id,
			createdAt: raw.created_at,
			amount: raw.amount,
			type: raw.type,
			sessionId: raw.session_id,
		});
	}
}
