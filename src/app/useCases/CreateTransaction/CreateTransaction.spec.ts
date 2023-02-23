import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { TransactionRepositoryInMemory } from "../../../../test/repositories/TransactionRepositoryInMemory";
import { Transaction } from "../../entities/Transaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";

describe("Create transaction", () => {
	let transactionRepository: TransactionRepository;

	beforeEach(() => {
		transactionRepository = new TransactionRepositoryInMemory();
	});

	it("should be able to create a new transaction", async () => {
		const transactionToCreate = new Transaction({
			amount: 200,
			createdAt: new Date(),
			id: randomUUID(),
			sessionId: randomUUID(),
			title: "Transaction test",
			type: "debit",
		});

		const transactionCreated = await transactionRepository.create(
			transactionToCreate,
		);

		const transaction = await transactionRepository.findById(
			transactionCreated.props.id,
		);

		expect(transaction).toBeTruthy();
	});
});
