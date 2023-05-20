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
