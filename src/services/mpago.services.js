import mercadopago from "mercadopago";
import { clientId, clientSecret } from "../config/config.js";

export const generatePaymentLink = async (items, payer, req) => {

    const server = 'https://grafer.netlify.app';
    const success = `${server}/success`;
    const failure = `${server}/herramientas-de-nutricion`;
    const pending = `${server}/herramientas-de-nutricion`;

    try {

        if (clientSecret && clientId) {
            mercadopago.configure({
                client_id: clientId,
                client_secret: clientSecret,
            });
        }

        const preferenceConfig = {
            items,
            back_urls: { success, failure, pending },
            payer,
            auto_return: "approved",
        }

        const preference = mercadopago.preferences.create(preferenceConfig)

        return preference

    } catch (error) {
        return error
    }
}

export const getPaymentStatus = async (payment_id, res) => {
    try {
        if (clientSecret && clientId) {
            mercadopago.configure({
                client_id: clientId,
                client_secret: clientSecret,
            });
        }
        const payment = await mercadopago.payment.get(payment_id);
        return payment
    } catch (error) {
        res.status(500).send(error.message);
    }
};