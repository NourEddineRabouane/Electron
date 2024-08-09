const router = require("express").Router();
const db = require("../database/db");
//
router.put("/", async (req, res) => {
    const comment = req.body.comment;
    //
    const q =
        "INSERT INTO views (id , user_id , comment ) values (uuid() , ? , ? )";

    try {
        const response = await db.query(q);
        if (response.length === 0)
            return res
                .status(200)
                .json({ message: "comment added successfully!" });
    } catch (error) {
        return res.status(400).json({ err: error });
    }
});
