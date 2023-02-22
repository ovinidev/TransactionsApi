import { FastifyReply, FastifyRequest } from "fastify";

export function checkSessionIdExist(
	req: FastifyRequest,
	res: FastifyReply,
	next: any,
) {
	const { sessionId } = req.cookies;

	if (!sessionId) res.status(401).send({ message: "Unauthorized" });

	next();
}
