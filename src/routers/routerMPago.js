import { Router } from "express";
import { createCheckout, handlePayment } from "../controllers/controllerMPago.js";

export const routerMPago = Router();

routerMPago.post("/process", createCheckout);
routerMPago.get("/success", handlePayment);
routerMPago.get("/failure", handlePayment);
routerMPago.get("/pending", handlePayment);

