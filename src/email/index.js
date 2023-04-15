import { createTransport } from 'nodemailer';
import { email, password } from '../config/config.js';

export const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: email,
        pass: password
    }
});