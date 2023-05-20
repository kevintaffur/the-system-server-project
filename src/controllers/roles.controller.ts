import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { toNewRol } from "../utils/helper";

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const roles = await req.prisma?.rol.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  res.status(200).json(roles);
  next();
};

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const newRol = toNewRol(req.body);

  const existingRol = await req.prisma?.rol.findUnique({
    where: {
      name: newRol.name,
    },
  });

  if (existingRol) {
    res.status(400).json({
      error: "Rol must be unique.",
    });
    return next();
  }

  const rol = await req.prisma?.rol.create({
    data: {
      name: newRol.name,
    },
  });
  res.status(201).json(rol);
  return next();
};

export default { get, create };
