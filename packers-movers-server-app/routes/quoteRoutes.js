import express from "express";
import quickQuoteController from "../controllers/quickQuoteController.js";

const router = express.Router();

router.post("/addQuote", quickQuoteController.addQuote);
router.get("/getAllQuote", quickQuoteController.getAllQuote);

export default router;
