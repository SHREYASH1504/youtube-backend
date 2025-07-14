import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js'; // ✅ Adjust the path as needed

import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImages',
            maxCount: 1
        }
    ]),
    registerUser
);

export default router;

