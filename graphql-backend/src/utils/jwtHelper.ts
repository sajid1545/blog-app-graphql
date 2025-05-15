import jwt, { Secret } from "jsonwebtoken";
import { prisma } from "..";
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

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return null;

    return {
      userId: user.id,
      role: user.role,
    };
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
