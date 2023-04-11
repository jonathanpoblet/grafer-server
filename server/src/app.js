import express from "express";
import cors from "cors";
import { routerContact } from "./routers/routerContact.js";
import { routerProducts } from "./routers/routerProducts.js";
import { routerMPago } from "./routers/routerMPago.js";
import { PORT } from "./config/config.js";


export const app = express();

app.listen(PORT)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({origin: {}}))

app.get("/", (req,res) => {
    res.json({success: success})
})
app.use("/api/products", routerProducts);
app.use("/api/contact", routerContact);
app.use("/mpago",routerMPago);
