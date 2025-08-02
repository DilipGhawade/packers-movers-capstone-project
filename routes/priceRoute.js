import express from "express";
import priceController from "../controllers/priceController.js";

const router = express.Router();

router.get("/getAllPrice", priceController.getAllPrice);
router.post("/addPrice", priceController.addPrice);

// Update price
router.put("/updatePrice/:id", priceController.updatePrice);

export default router;
