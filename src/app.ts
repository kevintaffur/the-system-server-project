import express from "express";
import institutionsRouter from "./routes/institutions.route";
import { setPrismaToRequest } from "./utils/middleware";
import { PrismaClient } from "@prisma/client";
import { prismaDisconnect } from "./utils/middleware";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.use(setPrismaToRequest(prisma));
app.use("/institutions", institutionsRouter);
app.use(prismaDisconnect);

export default app;
