const express = require("express");

const router = express.Router();
import { register } from "../controllers/userController.js";
//

router.post("/register", register);

export default router;
