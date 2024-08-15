const router = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config(); //TO use envirement variables
const db = require("../database/db");
const salt = 10 ;
//
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_STORE,
        pass: process.env.PASS_STORE,
    },
});
//change password
router.post("/change/:userId",  (req, res) => {
    const userId = req.params.userId;
    const password = req.body.newPassword;
    //
    const q = "UPDATE users SET password = ? WHERE id = ?";
    bcrypt.hash(password , salt ,(error , hashPassword) => {
        if (error ) return res.status(500).json(error);
        db.query(q , [hashPassword , userId] , (err) => {
            if (err) return res.status(500).json({error : err});
            return res.status(200).json({message : 'Password Changed successfully.'});
        });
    });


});

//when forget password
router.post("/", (req, res) => {
    const email = req.body.email;
    const q = "Select id from users where email=?";
    db.query(q, [email], (err, data) => {
        if (err) return res.status(500).json({ error: err });
        if (data.length === 0)
            return res
                .status(404)
                .json({ error : "Email not existed , please Sign up!" });

        const verificationCode = generateVirivicateCode();
        const mailOptions = {
            from: "electron.store098@gmail.com", // Sender address
            to: email, // Receiver's email address
            subject: "Password Reset", // Subject line
            text: `Here is the verification code to reset your password : ${verificationCode}`, // Plain text body
            html: `<p>Here is the verification code to reset your password<br/><h1>${verificationCode}</h1></p>`, // HTML body
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res
                    .status(500)
                    .json({ error: "Error sending email: " + error });
            }
            return res
                .status(200)
                .json({
                    message: "Email sent successfully!",
                    userId: data[0].id,
                    verificationCode,
                });
        });
    });
});

function generateVirivicateCode() {
    const salt = 6;
    let str = "";

    for (let i = 0; i < salt; i++) {
        str += Math.floor(Math.random() * 9);
    }
    return str;
}
module.exports = router;
