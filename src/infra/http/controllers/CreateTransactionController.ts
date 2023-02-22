import { randomUUID } from "crypto";
import { container } from "tsyringe";
import { z } from "zod";
import { CreateTransactionUseCase } from "../../../app/useCases/CreateTransaction/CreateTransactionUseCase";
import { handleError } from "../../errors/handleError";
import { TransactionViewModel } from "../viewModels/TransactionViewModel";

export class CreateTransactionController {
	async handle(req: any, res: any) {
		try {
			let sessionId: string = req.cookies.sessionId;

			if (!sessionId) {
				sessionId = randomUUID();

				res.cookie("sessionId", sessionId, {
					path: "/",
					maxAge: 1000 * 60 * 60 * 24, // 1 day
				});
			}

			const createTransactionUseCase = container.resolve(
				CreateTransactionUseCase,
			);

			const createTransactionBodySchema = z.object({
				title: z.string({ required_error: "Title is required" }).min(1),
				amount: z.number({ required_error: "Amount is required" }).min(1),
				type: z.union([z.literal("credit"), z.literal("debit")]),
			});

			const { title, amount, type } = createTransactionBodySchema.parse(
				req.body,
			);

			const transaction = await createTransactionUseCase.execute({
				title,
				amount,
				type,
				sessionId,
			});

			return TransactionViewModel.toHTTP(transaction);
		} catch (err) {
			handleError({ res, err });
		}
	}
}
