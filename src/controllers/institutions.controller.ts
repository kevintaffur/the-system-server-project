import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/customRequest";

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const institutions = await req.prisma?.institution.findMany({});
  res.json(institutions);
  next();
};

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const institution = await req.prisma?.institution.create({
    data: {
      name,
    },
  });
  res.json(institution);
  next();
};

export default { get, create };
