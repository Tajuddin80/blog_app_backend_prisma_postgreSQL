import express, { Router } from "express";
import { commentController } from "./comment.controller";
import { auth, ROLES } from "../../middlewares/auth";

const router = express.Router();
router.post("/", auth(ROLES.USER, ROLES.ADMIN), commentController.createComment);

export const commentRouter: Router = router;
