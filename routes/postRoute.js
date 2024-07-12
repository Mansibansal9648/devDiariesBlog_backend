import { Router } from "express";
import { createPostSchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';
import { createPost, getPost, deletePost } from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authentication.js";

const router = Router();

router.route("/create-post").post(createPostSchema,validationHandler,authenticateToken,createPost);
router.route("/get-post").get(authenticateToken,getPost);
router.route("/delete-post").delete(authenticateToken,deletePost);

export default router;
