const router = require("express").Router();
const { response } = require("express");
const db = require("../database/db");
//
router.put("/", (req, res) => {
    const { comment, id } = req.body;
    //
    const q =
        "INSERT INTO views (id , user_id , comment ) values (uuid() , ? , ? )";

    db.query(q, [id, comment], (err, response) => {
        if (err) return res.status(400).json({ err: error });

        return res.status(200).json({ message: "comment added successfully!" });
    });
});
//
router.get("/", (req, res) => {
    const q = `
    SELECT users.id, users.username, views.comment, views.created_at
    FROM users
    INNER JOIN views ON views.user_id = users.id
`;
    db.query(q, (err, response) => {
        if (err) return res.status(500).json({ err });
        if (response.length > 0) res.status(200).send(response);
    });
});
module.exports = router;
