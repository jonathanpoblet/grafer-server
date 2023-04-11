import { Router } from "express";
import { controllerPostEmail } from "../controllers/controllerContact.js";

export const routerContact = Router();

routerContact.post("/", controllerPostEmail);
