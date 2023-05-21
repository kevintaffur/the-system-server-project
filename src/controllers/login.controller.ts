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
import { toNewLogin } from "../utils/helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/config";

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const newLogin = toNewLogin(req.body);

  const user = await req.prisma?.user.findUnique({
    where: {
      email: newLogin.email,
    },
  });

  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(newLogin.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: "Invalid username or password",
    });
    return next();
  }

  const userForToken = {
    id: user.id,
    rol: user.rolId,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
  });
  return next();
};

export default { create };
