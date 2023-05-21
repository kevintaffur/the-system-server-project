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

import { NewUser } from "../types/user";
import { NewRol } from "../types/rol";
import { Login } from "../types/login";

type UserFields = {
  firstName: unknown;
  lastName: unknown;
  email: unknown;
  password: unknown;
  rolId: unknown;
};

type RolFields = {
  name: unknown;
};

type LoginFields = {
  email: unknown;
  password: unknown;
};

const toNewUser = ({
  firstName,
  lastName,
  email,
  password,
  rolId,
}: UserFields): NewUser => {
  const newUser = {
    firstName: parseString(firstName),
    lastName: parseString(lastName),
    email: parseString(email),
    password: parseString(password),
    rolId: parseNumber(rolId),
  };
  return newUser;
};

const toNewRol = ({ name }: RolFields): NewRol => {
  const newRol = {
    name: parseString(name),
  };
  return newRol;
};

const toNewLogin = ({ email, password }: LoginFields): Login => {
  const newLogin = {
    email: parseString(email),
    password: parseString(password),
  };
  return newLogin;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (nbr: unknown): nbr is number => {
  return typeof nbr === "number" || nbr instanceof Number;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing string value");
  }
  return str;
};

const parseNumber = (nbr: unknown): number => {
  if (!isNumber(nbr)) {
    throw new Error("Incorrect or missing value");
  }
  return nbr;
};

export { toNewUser, toNewRol, toNewLogin };
