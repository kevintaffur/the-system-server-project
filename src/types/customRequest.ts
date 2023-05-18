import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export interface CustomRequest extends Request {
  prisma?: PrismaClient;
}
