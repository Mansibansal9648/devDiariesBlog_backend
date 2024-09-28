 import {Router} from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

 const router=Router();

router.route('/get-all-categories').get(getAllCategories)

export default router;