import { createTransport } from 'nodemailer';

export const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'jonathanpoblet228@gmail.com',
        pass: 'qirrazrpudrfgoni'
    }
});