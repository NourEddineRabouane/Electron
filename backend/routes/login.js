const db = require("../database/db");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
    const q = "SELECT * FROM users WHERE email=?";
    const { email, password } = req.body;

    db.query(q, [email], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        if (data.length > 0) {
            //compare the sent password and the stored password in the db
            bcrypt.compare(password, data[0].password, (err, response) => {
                if (err)
                    return res
                        .status(500)
                        .json({ error: "Couldn't compare passwords" });
                if (response) {
                    const id = data[0].id;
                    // const hashId = await bcrypt.hash(id, 10); //hash id
                    //genrate a token
                    const token = jwt.sign({ id }, "electron-secret-key", {
                        expiresIn: "1d",
                    });
                    //store it in the cookies of the borowser
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "Lax",
                    });
                    res.cookie(
                        "info",
                        JSON.stringify({
                            login: true,
                            userRole: data[0].role,
                            id,
                        })
                    );
                    return res
                        .status(200)
                        .json({ message: "Log in successfully" });
                } else {
                    return res
                        .status(400)
                        .json({ message: "Password incorrect!" });
                }
            });
        } else {
            return res.status(404).json({ message: "No such email existed" });
        }
    });
});

module.exports = router;
