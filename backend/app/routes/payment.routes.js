import { Router } from "express";
import { cancelOrder, captureOrder, createOrder } from "../controllers/payment.controllers.js";

/**
 * Estas son las rutas del backend de payment para el pago en mi proyecto 
 * @type {object}
 */
const router = Router();

router.get("/create-order", createOrder);
router.get("/capture-order", captureOrder);
router.get("/cancel-order", cancelOrder); 

export default router;