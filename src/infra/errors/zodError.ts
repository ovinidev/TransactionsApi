import { z } from "zod";

interface handleErrorProps {
	err: any;
	res: any;
}

export function handleError({ err, res }: handleErrorProps) {
	if (err instanceof z.ZodError) {
		const error = err.issues.map((err) => err.message);
		return res.status(400).send({
			message: error,
		});
	}
	return res.status(400).send({
		message: err.message,
	});
}
