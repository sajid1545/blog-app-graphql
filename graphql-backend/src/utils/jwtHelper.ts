import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (payload: { userId: number }, secret: Secret) => {
  const token = jwt.sign(payload, secret);
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret as string) as {
      userId: number;
    };
    return decoded;
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
