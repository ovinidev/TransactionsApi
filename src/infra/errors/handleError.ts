import { FastifyReply } from "fastify";
import { z } from "zod";
import { AppError } from "../../app/errors/appError";

interface handleErrorProps {
	err: any;
	res: FastifyReply;
}

export function handleError({ err, res }: handleErrorProps) {
	if (err instanceof z.ZodError) {
		const error = err.issues.map((err) => err.message);
		return res.status(400).send({
			message: error,
		});
	}

	if (err instanceof AppError) {
		res.status(err.code).send(err.message);
	}

	return res.status(400).send({
		message: err.message,
	});
}
