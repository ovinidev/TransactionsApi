import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { TransactionRepositoryInMemory } from "../../../../test/repositories/TransactionRepositoryInMemory";
import { Transaction } from "../../entities/Transaction";
import { TransactionRepository } from "../../repositories/TransactionRepository";

describe("Find transactions summary", () => {
	let transactionRepository: TransactionRepository;

	beforeEach(() => {
		transactionRepository = new TransactionRepositoryInMemory();
	});

	it("should be able to get transactions summary", async () => {
		const sessionId = randomUUID();

		await transactionRepository.create(
			new Transaction({
				amount: 400,
				createdAt: new Date(),
				id: randomUUID(),
				sessionId: sessionId,
				title: "Transaction batman",
				type: "debit",
			}),
		);

		await transactionRepository.create(
			new Transaction({
				amount: 200,
				createdAt: new Date(),
				id: randomUUID(),
				sessionId: sessionId,
				title: "Transaction spider man",
				type: "debit",
			}),
		);

		await transactionRepository.create(
			new Transaction({
				amount: 500,
				createdAt: new Date(),
				id: randomUUID(),
				sessionId: randomUUID(),
				title: "Transaction spider wolverine",
				type: "debit",
			}),
		);

		const transactionsSummary = 1100;

		const { amount } = await transactionRepository.findSummary(sessionId);

		expect(amount).toEqual(transactionsSummary);
	});
});
