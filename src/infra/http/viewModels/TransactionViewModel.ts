import { Transaction } from "../../../app/entities/Transaction";

export interface TransactionViewModelProps {
	title: string;
	createdAt?: Date;
	id?: string;
	amount: number;
	type: string;
	sessionId: string;
}

export class TransactionViewModel {
	static toHTTP(transaction: Transaction): TransactionViewModelProps {
		return {
			title: transaction.title,
			createdAt: transaction.props.createdAt,
			id: transaction.props.id,
			type: transaction.props.type,
			amount: transaction.props.amount,
			sessionId: transaction.props.sessionId,
		};
	}
}
