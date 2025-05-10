export const checkUserAccess = async (
  prisma: any,
  userId: string,
  postId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return {
      userError: "User not found",
      post: null,
    };
  }

  const isPostExists = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
  });

  if (!isPostExists) {
    return {
      userError: "Post not found",
      post: null,
    };
  }

  if (isPostExists.authorId !== userId) {
    return {
      userError: "Unauthorized",
      post: null,
    };
  }
};
