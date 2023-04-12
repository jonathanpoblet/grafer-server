import { createTransport } from 'nodemailer';

export const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'grafer1357@gmail.com',
        pass: 'naprwpnysngwmght'
    }
});