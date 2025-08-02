import express from "express";
import contatUs from "../controllers/contactController.js";

const router = express.Router();

router.post("/contactUs", contatUs.contactUs);
router.get("/getAllContact", contatUs.getAllContact);

export default router;
