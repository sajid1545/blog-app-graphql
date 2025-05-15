export const Query = {
  me: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: Number(userInfo.userId),
      },
    });
  },

  profile: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },

  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },

  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo || userInfo.role !== "ADMIN") {
      throw new Error("You must be an admin to view posts.");
    }

    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
