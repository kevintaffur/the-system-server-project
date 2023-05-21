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

import { PrismaClient } from "@prisma/client";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest";
import logger from "./logger";
import { SECRET } from "./config";
import jwt from "jsonwebtoken";
import { Token } from "../types/token";
import { UserAtRequest } from "../types/user";

const setPrismaToRequest = (prisma: PrismaClient) => {
  return (req: CustomRequest, _res: Response, next: NextFunction) => {
    req.prisma = prisma;
    next();
  };
};

const prismaDisconnect = async (req: CustomRequest, _res: Response) => {
  try {
    await req.prisma?.$disconnect();
    logger.info("Prisma disconnected.");
  } catch (error) {
    logger.error(error);
    await req.prisma?.$disconnect();
    process.exit(1);
  }
};

const requestLogger = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("------------------");
  next();
};

const setTokenToRequest = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  let token: string | null = "";
  if (
    authorization &&
    authorization.toLocaleLowerCase().startsWith("bearer ")
  ) {
    token = authorization.substring(7);
  } else {
    token = null;
  }
  req.token = token;
  next();
};

const setUserToRequest = async (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const { token } = req;

  if (!token) {
    return next();
  }

  const decodedToken = jwt.verify(token, SECRET);

  const user = await req.prisma?.user.findUnique({
    where: {
      id: (decodedToken as Token).id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      rolId: true,
    },
  });
  req.user = user as UserAtRequest;
  next();
};

export {
  setPrismaToRequest,
  prismaDisconnect,
  requestLogger,
  setTokenToRequest,
  setUserToRequest,
};
