import { Mutation } from "./Mutations/Mutation";
import { Post } from "./Queries/post";
import { Profile } from "./Queries/profile";
import { Query } from "./Queries/Query";

export const resolvers = {
  Mutation,
  Query,
  Profile,
  Post,
};
