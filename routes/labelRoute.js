import { Router } from "express";
import {createLabel,getAllLabel} from '../controllers/labelController.js'

const router = Router();

router.route("/create-label").post(createLabel);
router.route("/get-all-label").get(getAllLabel);


export default router;
