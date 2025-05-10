import { User } from "@prisma/client";
import { prisma } from "..";

const batchUsers = async (ids: number[]) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /*
    {   
        //! key: value (User)
        1: {id: 1, name: fahim}
        2: {id: 2, name: fahim}
        4: {id: 4, name: fahim}
        10: {id: 10, name: fahim}
        3: {id: 3, name: fahim}
    }
    */
  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => userData[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);
