import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { Transaction } from "./Transaction";

describe("Transaction entity", () => {
	it("should be able to create a new instance of transaction", () => {
		const transaction = new Transaction({
			amount: 200,
			createdAt: new Date(),
			id: randomUUID(),
			sessionId: randomUUID(),
			title: "Transaction test",
			type: "debit",
		});

		expect(transaction).toBeTruthy();
	});
});
