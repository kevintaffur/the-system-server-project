import { PrismaClient } from "@prisma/client";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest";
import logger from "./logger";

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

export { setPrismaToRequest, prismaDisconnect };
