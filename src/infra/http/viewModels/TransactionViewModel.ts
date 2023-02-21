import { Transaction } from "../../../app/entities/Transaction";

export interface TransactionViewModelProps {
	title: string;
	createdAt?: Date;
	id?: string;
}

export class TransactionViewModel {
	static toHTTP(transaction: Transaction): TransactionViewModelProps {
		return {
			title: transaction.title,
			createdAt: transaction.props.createdAt,
			id: transaction.props.id,
		};
	}
}
