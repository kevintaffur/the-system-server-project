import express from "express";
import usersRouter from "./routes/users.route";
import rolesRouter from "./routes/roles.route";
import { setPrismaToRequest } from "./utils/middleware";
import { PrismaClient } from "@prisma/client";
import { prismaDisconnect } from "./utils/middleware";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.use(setPrismaToRequest(prisma));
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use(prismaDisconnect);

export default app;
