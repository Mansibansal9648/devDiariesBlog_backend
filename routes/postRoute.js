import { Router } from "express";
import { createPostSchema, editPostSchema, getPostByLabelSchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';
import { createPost, getPost, deletePost,editPost, getPostByLabel } from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authentication.js";

const router = Router();

router.route("/create-post").post(createPostSchema,validationHandler,authenticateToken,createPost);
router.route("/get-post").get(authenticateToken,getPost);
router.route("/update-post").put(editPostSchema,validationHandler,authenticateToken,editPost);
router.route("/delete-post").delete(authenticateToken,deletePost);
router.route("/get-post-label").post(getPostByLabelSchema,validationHandler,authenticateToken,getPostByLabel);

export default router;
