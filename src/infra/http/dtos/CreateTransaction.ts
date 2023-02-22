export interface CreateTransactionDto {
	title: string;
	amount: number;
	type: "credit" | "debit";
	sessionId: string;
}
