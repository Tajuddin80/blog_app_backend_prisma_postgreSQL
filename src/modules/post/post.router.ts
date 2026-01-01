import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { postControllers } from "./post.controller";
import { auth, ROLES } from "../../middlewares/auth";

const router = Router();

router.post("/create-post", auth(ROLES.USER), postControllers.createPost);
router.get("/", postControllers.getAllPosts);
export const postRouter: Router = router;
