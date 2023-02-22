import { container } from "tsyringe";
import { z } from "zod";
import { CreateTransactionUseCase } from "../../../app/useCases/CreateTransactionUseCase copy";
import { handleError } from "../../errors/zodError";

export class CreateTransactionController {
	async handle(req: any, res: any) {
		try {
			const createTransactionUseCase = container.resolve(
				CreateTransactionUseCase,
			);

			const createTransactionBodySchema = z.object({
				title: z.string({ required_error: "Title is required" }),
				amount: z.number({ required_error: "Amount is required" }),
				type: z.union([z.literal("credit"), z.literal("debit")]),
			});

			const { title, amount, type } = createTransactionBodySchema.parse(
				req.body,
			);

			const amountBasedOnType = type === "credit" ? amount : amount * -1;

			await createTransactionUseCase.execute({
				title,
				amount: amountBasedOnType,
				type,
			});

			return res
				.status(201)
				.send({ message: "Transaction created", code: 201 });
		} catch (err: any) {
			handleError({ res, err });
		}
	}
}
