import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shah.sagar2006@gmail.com',
        pass: 'akhlfugafqfarctl',
    },
});

export default transporter;