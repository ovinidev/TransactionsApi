import fastify from "fastify";

const app = fastify();

app.get("/hello", async (request, reply) => {
	return reply.send({ message: "oi" });
});

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP Server Running");
	});
