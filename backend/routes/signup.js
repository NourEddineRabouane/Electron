const Router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../database/db");
const salt = 10;
//
//
Router.post("/", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password.toString(), salt, (err, response) => {//hash the password
        if (err)
            return res.status(500).json({ error: "Couldn't hash password!" });
        else {
            const q =
                "INSERT INTO users (id , username , email ,password , role) values (uuid(),?,?,?,DEFAULT)";
            //
            db.query(q, [username, email, response], (err) => {
                if (err) return res.status(500).json({ error: err });
                return res
                    .status(200)
                    .json({ message: "Sign up successfully" });
            });
        }
    });
});

module.exports = Router;
