export interface TransactionProps {
	id: string;
	title: string;
	createdAt: Date;
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
}
