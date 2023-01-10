import nodemailer from 'nodemailer';
const config = useRuntimeConfig()

var transporter = nodemailer.createTransport({
    service: config.emailService,
    auth: {
        user: config.email,
        pass: config.emailPass
    }
});


export const sendOtpMail = async (username: string, to_email: string, otp: number) => {
    var mailOptions = {
        from: { name: config.public.appName, address: config.email },
        to: to_email,
        subject: `Email verification | ${config.public.appName}`,
        text: `Welcome to ${config.public.appName}\n\nYour otp for email validation is ${otp}.\n\n${config.public.url}/signup/`
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
