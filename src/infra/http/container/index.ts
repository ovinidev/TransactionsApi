import { container } from "tsyringe";
import { TransactionRepository } from "../../../app/repositories/TransactionRepository";
import { PrismaTransactionRepository } from "../../database/prisma/repositories/PrismaTransactionRepository";

container.registerSingleton<TransactionRepository>(
	"TransactionRepository",
	PrismaTransactionRepository,
);
