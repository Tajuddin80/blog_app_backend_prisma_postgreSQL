import type { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({ success: false, error: "Unaurhorized" });
    }
    // console.log(req.user);
    const result = await postServices.createPost(
      req.body,
      req.user.id as string
    );
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "Post creation failed", detailes: error });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    // console.log("Search :", search);
    const searchString = typeof search === "string" ? search : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const result = await postServices.getAllPost({
      search: searchString,
      tags,
    });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "Post get failed", detailes: error });
  }
};

export const postControllers = {
  createPost,
  getAllPost,
};
