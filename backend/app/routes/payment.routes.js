import { Router } from "express";
import { cancelOrder, captureOrder, createOrder } from "../controllers/payment.controllers.js";

const router = Router();

router.get("/create-order", createOrder);
router.get("/capture-order", captureOrder);
router.get("/cancel-order", cancelOrder); 

export default router;