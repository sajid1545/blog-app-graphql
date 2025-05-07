import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (payload: { userId: number }, secret: Secret) => {
  const token = jwt.sign(payload, secret);
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  const decodedToken = jwt.verify(token, config.jwt.secret as string);
  return decodedToken;
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
