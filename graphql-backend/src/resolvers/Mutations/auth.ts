import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHelper } from "../../utils/jwtHelper";

export const authResolvers = {
  signup: async (parent: any, args: any, { prisma }: any) => {
    const userExists = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });

    if (userExists) {
      return {
        userError: "User already exists",
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
        role: args.role || "USER",
      },
    });

    if (args?.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );
    return {
      userError: null,
      token,
      user: newUser,
    };
  },

  signin: async (parent: any, args: any, { prisma }: any) => {
    const isUserExists = await prisma.user.findUnique({
      where: {
        email: args.email,
      },
    });

    if (!isUserExists) {
      return {
        userError: "User not found",
        token: null,
        user: null,
      };
    }

    const isPasswordMatched = await bcrypt.compare(
      args.password,
      isUserExists.password
    );

    if (!isPasswordMatched) {
      return {
        userError: "Invalid Password",
        token: null,
        user: null,
      };
    }

    const token = await jwtHelper.generateToken(
      { userId: isUserExists.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token,
      user: isUserExists,
    };
  },
};
