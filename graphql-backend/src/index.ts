import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { jwtHelper } from "./utils/jwtHelper";

export const prisma = new PrismaClient();

interface UserInfo {
  userId: number | null;
  role: string; // or use Role enum if available
}

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: UserInfo | null;
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: any): Promise<Context> => {
      const userInfo = await jwtHelper.getUserInfoFromToken(
        req.headers.authorization as string
      );
      return {
        prisma,
        userInfo,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
