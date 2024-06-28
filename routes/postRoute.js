import { Router } from "express";
// import { createPostSchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';
import { createPost } from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authentication.js";

const router = Router();

router.route("/create-post").post(authenticateToken,createPost);

export default router;
