import upload from "../middlewares/uploadImage.js";
import express from "express";
import serviceController from "../controllers/serviceController.js";

const router = express.Router();

router.post(
  "/addService",
  upload.single("imageUrl"),
  serviceController.addService
);
router.get("/getAllService", serviceController.getAllService); //

router.put(
  "/updateService",
  upload.single("imageUrl"),
  serviceController.updateService
);

router.delete("/deleteService", serviceController.deleteSerciveById);

export default router;
