const express = require("express");
const db = require("../database/db"); // Assuming this is the mysql2 pool instance
const util = require("util");

const router = express.Router();

db.query = util.promisify(db.query);
db.beginTransaction = util.promisify(db.beginTransaction);
db.commit = util.promisify(db.commit);
db.rollback = util.promisify(db.rollback);

router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;

    const connection = db; // Using the existing connection

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Execute delete queries
        await connection.query("DELETE FROM rates WHERE user_id = ?", [userId]);
        await connection.query("DELETE FROM views WHERE user_id = ?", [userId]);
        await connection.query("DELETE FROM users WHERE id = ?", [userId]);

        // Commit the transaction
        await connection.commit();

        // Send response
        return res.status(200).json({
            message: "User has been deleted successfully.",
        });
    } catch (error) {
        // Rollback the transaction in case of error
        await connection.rollback();
        res.status(500).json({ error: "Failed to delete user." });
    }
});


router.get("/", async (req, res) => {
    const q = "Select id ,username , email , created_at from users";
    try {
        const data = await db.query(q);
        if (data.length > 0) return res.status(200).json(data);
    }
    catch(err){
        if (err) return res.status(500).json({ error: err });
    }
});

module.exports = router;
