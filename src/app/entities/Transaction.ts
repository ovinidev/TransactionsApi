export interface TransactionProps {
	id: string;
	title: string;
	amount: number;
	type: string;
	createdAt: Date;
	sessionId: string;
}

export class Transaction {
	props: TransactionProps;

	constructor(props: TransactionProps) {
		this.props = props;
	}

	public get title(): string {
		return this.props.title;
	}

	public set title(title: string) {
		this.props.title = title;
	}

	public get amount(): number {
		return this.props.amount;
	}

	public set amount(amount: number) {
		this.props.amount = amount;
	}

	public get type(): string {
		return this.props.type;
	}

	public set type(type: string) {
		this.props.type = type;
	}
}
