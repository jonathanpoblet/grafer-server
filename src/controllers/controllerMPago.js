import { generatePaymentLink } from "../services/mpago.services.js";

export const createCheckout = async (req, res) => {
  try {
      const user = req.body.user
      const product = req.body.product
    
      const items = [{
        currency_id: "ARS",
        title: product.title,
        description: "Grafer Product",
        quantity: 1,
        unit_price: product.price,
        pdf: product.prf
      }];
  
      const payer = {
        name: user.name,
        surname: user.surname,
        email: user.email,
      }
  
  
      let link = await generatePaymentLink(items, payer, req);
  
      res.status(201).json({ "link": link?.body.init_point })
  
    } catch (error) {
      res.status(400).json(({ message: error.message }))
    }
  };

export const handlePayment = async (req, res) => {
    try {
      const { payment_id, status, external_reference } = req.query;
  
      if (!payment_id || !status || !external_reference) {
        throw new Error("Please provide payment_id, status and external_reference")
      }

      res.status(200).json(({ message: `Payment ${payment_id} was ${status}` }))
  
    } catch (error) {
      res.status(500).json({ "error": error.message })
    }
};