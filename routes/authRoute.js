 import {Router} from 'express';
import {forgotPassword, login,signUp} from '../controllers/authController.js'
import { loginUserSchema, signupUserSchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';

 const router=Router();

router.route('/login').post(loginUserSchema,validationHandler,login)
router.route('/signup').post(signupUserSchema,validationHandler,signUp)
router.route('/forgot-password').post(forgotPassword)

export default router;