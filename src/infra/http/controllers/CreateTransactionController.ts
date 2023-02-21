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

			const createTransactionBody = z.object({
				title: z.string({ required_error: "Title is required" }),
			});

			const { title } = createTransactionBody.parse(req.body);

			await createTransactionUseCase.execute({ title });

			return res.send({ message: "Transaction created" });
		} catch (err: any) {
			handleError({ res, err });
		}
	}
}
