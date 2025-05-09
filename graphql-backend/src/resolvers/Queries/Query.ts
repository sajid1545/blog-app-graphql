export const Query = {
  //   me: async (parent: any, args: any, { prisma, userInfo }: any) => {
  //     console.log("🚀 ~ me: ~ userInfo:", userInfo);
  //   },

  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
