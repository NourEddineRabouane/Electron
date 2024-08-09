// routes/products.js
const express = require("express");
const router = express.Router();
const db = require("../database/db"); // Import database connection
const cloudinary = require("../cloud");
//
router.get("/update/:id", (req, res) => {
    const productID = req.params.id;
    const q =
        "SELECT * FROM products WHERE id=?";
    db.query(q,[productID], (err , result) => {
        if (err) return res.status(400).json({error : `Error : ${err}`});
        res.status(201).json(result[0]);
    })
});

//delete specific product
router.delete("/delete/:id", (req, res) => {
    const productID = req.params.id;
    const qe = "SELECT imagePublicId FROM products WHERE id=?";
    //
    db.query(qe, [productID], (err, result) => {
        if (err) return res.status(404).json("image public id not found."); //if an error during getting publicid
        //
        const q = "DELETE FROM products WHERE id=?";
        const imagePublicId = result[0].imagePublicId;
        //
        db.query(q, [productID], (err) => {
            if (err) return res.status(400).json({ error: err.message }); //can't delete product
            
            //delete the image from the cloud
            cloudinary.uploader
                .destroy(imagePublicId, { invalidate: true })
                .then((result) => {
                    if (result.result === "ok")
                        res.status(200).json({
                            OK: true,
                            message: "Product has been deleted successfully.",
                        });
                });
        });
    });
});

//Get Specific Product By title
router.get("/specific", (req, res) => {
    const str = req.query.title;
    const title = str.split("").join("[^\\s]*"); //transform the title into a gegex expr
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
        res.status(201).json(result);
    });
});
//

//Get All Products
router.get("/", (req, res) => {
    const q =
        "SELECT `id`, `title`, `price`, `imageLink` ,`categorie` , `stock` , `description` FROM `products` WHERE 1";
    db.query(q, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(result);
    });
});
//
module.exports = router;
