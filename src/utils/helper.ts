import { NewUser } from "../types/user";
import { NewRol } from "../types/rol";

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

export { toNewUser, toNewRol, parseNumber };
