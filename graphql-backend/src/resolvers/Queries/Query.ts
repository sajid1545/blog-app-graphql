export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: Number(userInfo.userId),
      },
    });
  },

  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
