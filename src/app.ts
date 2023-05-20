// TS - The System
// Copyright (c) 2023 Kevin Taffur
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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
