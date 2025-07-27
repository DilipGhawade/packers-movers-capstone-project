import express from "express";
import quickQuoteController from "../controllers/quickQuoteController.js";

const router = express.Router();

router.post("/addQuote", quickQuoteController.addQuote);
router.get("/getAllQuote", quickQuoteController.getAllQuote);
router.get("/getQuoteById", quickQuoteController.getQuoteById);

export default router;
