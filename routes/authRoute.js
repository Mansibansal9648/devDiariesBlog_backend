import { Router } from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
} from "../controllers/authController.js";
import {
  forgotPasswordSchema,
  loginUserSchema,
  resetPasswordSchema,
  signupUserSchema,
} from "../schemas/utils/validationSchema.js";
import { validationHandler } from "../middlewares/validationHandler.js";

const router = Router();

router.route("/login").post(loginUserSchema, validationHandler, login);
router.route("/signup").post(signupUserSchema, validationHandler, signUp);
router
  .route("/forgot-password")
  .post(forgotPasswordSchema, validationHandler, forgotPassword);
router
  .route("/reset-password")
  .post(resetPasswordSchema, validationHandler, resetPassword);

export default router;
