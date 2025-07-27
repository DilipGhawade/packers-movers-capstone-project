import express from "express";
import contatUs from "../controllers/contactController.js";

const router = express.Router();

router.post("/contactUs", contatUs);

export default router;
