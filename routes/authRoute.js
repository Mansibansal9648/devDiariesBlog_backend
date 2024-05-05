 import {Router} from 'express';
import {login,signUp} from '../controllers/authController.js'

 const router=Router();

router.route('/login').post(login)
router.route('/signup').post(signUp)
// router.post('/signup', signUp);

export default router;