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
import { toNewUser } from "../utils/helper";
import bcrypt from "bcrypt";

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const users = await req.prisma?.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  res.status(200).json(users);
  next();
};

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const newUser = toNewUser(req.body);

  const existingUser = await req.prisma?.user.findUnique({
    where: {
      email: newUser.email,
    },
  });

  if (existingUser) {
    res.status(400).json({
      error: "Email must be unique.",
    });
    return next();
  }

  if (!newUser.password) {
    res.status(400).json({
      error: "Password missing.",
    });
    return next();
  }

  if (newUser.password.length < 5) {
    res.status(400).json({
      error: "Password must be at least 5 characters long.",
    });
    return next();
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const user = await req.prisma?.user.create({
    data: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      passwordHash,
      rolId: newUser.rolId,
    },
  });
  res.status(201).json(user);
  return next();
};

export default { get, create };
