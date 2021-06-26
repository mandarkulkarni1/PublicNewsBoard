const mailer = require("nodemailer");

function sendEmail(email, subject, body, callback) {
    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "publicnewsofficialauth@gmail.com",
            pass: "Mdd@1995",
        },
    });

    transport.sendMail({
            from: "publicnewsofficialauth@gmail.com",
            to: email,
            subject: subject,
            html: body,
        },
        callback
    );
}

sendEmail;
module.exports = {
    sendEmail: sendEmail,
};