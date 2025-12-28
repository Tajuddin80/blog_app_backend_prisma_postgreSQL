import type { Post } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">
) => {
  const result = await prisma.post.create({
    data,
  });
  return result;
};

const getAllPosts = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const postServices = {
  createPost,
  getAllPosts,
};
