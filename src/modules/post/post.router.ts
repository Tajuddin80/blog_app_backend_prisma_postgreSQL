import { Router, type Request, type Response } from "express";
import { postControllers } from "./post.controller";

const router = Router();
router.post("/create-post", postControllers.createPost);
router.get("/", postControllers.getAllPosts);
export const postRouter: Router = router;
