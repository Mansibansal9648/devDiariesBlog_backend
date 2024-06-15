import { Router } from "express";
import {createLabel,getAllLabel,getLabelByName} from '../controllers/labelController.js'

const router = Router();

router.route("/create-label").post(createLabel);
router.route("/get-all-label").get(getAllLabel);
router.route("/get-label").post(getLabelByName);

export default router;
