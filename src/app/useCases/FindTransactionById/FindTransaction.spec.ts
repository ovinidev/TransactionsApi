import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { TransactionRepositoryInMemory } from "../../../../test/repositories/TransactionRepositoryInMemory";
import { Transaction } from "../../entities/Transaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";

describe("Find transaction by id", () => {
	let transactionRepository: TransactionRepository;

	beforeAll(() => {
		transactionRepository = new TransactionRepositoryInMemory();
	});

	it("should be able to get a transaction by id", async () => {
		const transactionToCreate = new Transaction({
			amount: 200,
			createdAt: new Date(),
			id: randomUUID(),
			sessionId: randomUUID(),
			title: "Transaction batman",
			type: "debit",
		});

		const transactionCreated = await transactionRepository.create(
			transactionToCreate,
		);

		const transaction = await transactionRepository.findById(
			transactionCreated.id,
		);

		expect(transaction).toBeTruthy();
	});
});
