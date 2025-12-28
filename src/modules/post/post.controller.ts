import type { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postServices.createPost(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "Post creation failed", detailes: error });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await postServices.getAllPosts();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "Post get failed", detailes: error });
  }
};

export const postControllers = {
  createPost,
  getAllPosts,
};
