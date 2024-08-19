// routes/products.js
const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Import database connection
const cloudinary = require("../cloud");
const util = require("util"); //to promisify functions

//define an instance of db to use the promisify functions and use it only when to delete some product
const connection = db;
connection.query = util.promisify(connection.query);
connection.beginTransaction = util.promisify(connection.beginTransaction);
connection.commit = util.promisify(connection.commit);
connection.rollback = util.promisify(connection.rollback);

//get popular products
router.get("/popular", (req, res) => {
    const q = `
    SELECT p.*, AVG(r.rating) AS rating FROM products p LEFT JOIN rates r ON p.id = r.product_id GROUP BY p.id HAVING AVG(r.rating) >= 4 LIMIT 3;`;
    db.query(q, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(data);
    });
});

//get product by id
router.get("/single/:id", (req, res) => {
    const productID = req.params.id;
    const q = //Left Join means select product even if he has no rates
        "SELECT p.*, avg(r.rating ) as rating FROM products p LEFT JOIN rates r ON p.id = r.product_id WHERE p.id=?;";
    db.query(q, [productID], (err, result) => {
        if (err) return res.status(400).json({ error: `Error : ${err}` });
        return res.status(201).json(result[0]);
    });
});

//delete specific product
router.delete("/delete/:id", async (req, res) => {
    const productID = req.params.id;
    const selectQuery = "SELECT imagePublicId FROM products WHERE id=?";
    const deleteRatesQuery = "DELETE FROM rates WHERE product_id=?";
    const deleteProductQuery = "DELETE FROM products WHERE id=?";

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Fetch the image public ID
        const [rows] = await connection.query(selectQuery, [productID]);
        if (rows.length === 0) {
            await connection.rollback();
            return res.status(404).json({ error: "Product not found." });
        }
        const imagePublicId = rows.imagePublicId;

        // Delete related rows from 'rates' table
        await connection.query(deleteRatesQuery, [productID]);

        // Delete the product
        await connection.query(deleteProductQuery, [productID]);

        // Delete the image from Cloudinary
        cloudinary.uploader
            .destroy(imagePublicId, { invalidate: true })
            .then(async (result) => {
                if (result.result === "ok") {
                    await connection.commit(); // Commit the transaction if everything is OK
                    return res.status(200).json({
                        OK: true,
                        message: "Product has been deleted successfully.",
                    });
                } else {
                    throw new Error("Image deletion failed.");
                }
            })
            .catch(async (error) => {
                await connection.rollback(); // Rollback the transaction if image deletion fails
                return res.status(500).json({
                    error: "Failed to delete image: " + error.message,
                });
            });
    } catch (error) {
        // Rollback the transaction in case of error
        await connection.rollback();
        res.status(500).json({
            error: "Failed to delete product: " + error.message,
        });
    }
});

// router.delete("/delete/:id", async (req, res) => {
//     const productID = req.params.id;
//     const qe = "select imagePublicId from product where id=?";
//     //
//     try {
//         // Start a transaction
//         await connection.beginTransaction();

//         // Execute delete queries
//         const data = await connection.query(qe, [userId]);
//         const imagePublicId = data[0].imagePublicId;
//         await connection.query("DELETE FROM rates WHERE product_id=?", [
//             productID,
//         ]);
//         await connection.query("DELETE FROM products WHERE id=?", [productID]);

//         cloudinary.uploader
//             .destroy(imagePublicId, { invalidate: true })
//             .then(async (result) => {
//                 if (result.result === "ok") {
//                     await connection.commit();
//                     return res.status(200).json({
//                         OK: true,
//                         message: "Product has been deleted successfully.",
//                     });
//                 }
//             });

//     } catch (error) {
//         // Rollback the transaction in case of error
//         await connection.rollback();
//         res.status(500).json({ error: "Failed to delete user :"+error });
//     }
//     //
//     // db.query(qe, [productID], (err, result) => {
//     //     if (err) return res.status(404).json("image public id not found."); //if an error during getting publicid
//     //     //
//     //     const q =
//     //         "DELETE FROM products WHERE id=?; DELETE FROM rates where product_id=?";
//     //     const imagePublicId = result[0].imagePublicId;
//     //     //
//     //     db.query(q, [productID, productID], (err) => {
//     //         if (err) return res.status(400).json({ error: err.message }); //can't delete product

//     //         //delete the image from the cloud
//     //         cloudinary.uploader
//     //             .destroy(imagePublicId, { invalidate: true })
//     //             .then((result) => {
//     //                 if (result.result === "ok")
//     //                     return res.status(200).json({
//     //                         OK: true,
//     //                         message: "Product has been deleted successfully.",
//     //                     });
//     //             });
//     //     });
//     // });
// });

//Get Specific Product By title
router.get("/specific", (req, res) => {
    const str = req.query.title;
    const title = str.split("").join("[^\\s]*"); //transform the title into a gegex expression
    //
    const q =
        "SELECT id , price , title , imageLink FROM products WHERE title REGEXP ?";
    db.query(q, [title], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        if (result.length == 0)
            return res.status(404).json({
                message:
                    "No such product with this title. Please check the speeling!",
            });
        res.status(201).json(result);
    });
});

//Get Products By Categorie
router.get("/categorie", (req, res) => {
    const categorie = req.query.categorie; //get the categorie that was sent
    const q =
        "SELECT id , price , title , imageLink FROM products WHERE categorie=?;";
    db.query(q, [categorie], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json(result);
    });
});
//

//Get All Products
router.get("/", (req, res) => {
    const q =
        "SELECT  p.*, AVG(r.rating) AS rating FROM  products p LEFT JOIN rates r ON p.id = r.product_id GROUP BY p.id;";
    db.query(q, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json(result);
    });
});
//
module.exports = router;
