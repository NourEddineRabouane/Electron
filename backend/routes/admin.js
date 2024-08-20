const router = require("express").Router();
const db = require("../database/db");
const multer = require("multer");
const cloudinary = require("../cloud");
//
const storage = multer.memoryStorage();
const upload = multer({ storage });
//
router.post("/", upload.single("image"), (req, res) => {
    const data = JSON.parse(req.body.informations);
    //check if the data is available
    if (req.file) {
        //upload the image to cloudinary
        cloudinary.uploader
            .upload_stream({ resource_type: "image" }, (err, result) => {
                if (err) res.status(500).send({error : err});
                const url = result.secure_url; //from cloudinary
                const publicID = result.public_id; //from cloudinary

                //store the information of the product in the database
                const q =
                    "INSERT INTO `products`(`id`, `title`, `description`, `price`, `stock`, `imageLink`,`categorie`,`imagePublicId`, `created_at`)  VALUES (uuid(),?,?,?,?,?,?,?,now())";
                db.query(
                    q,
                    [
                        data.title,
                        data.description,
                        data.price,
                        data.stock,
                        url,
                        data.categorie,
                        publicID,
                    ],
                    (err) => {
                        if (err) {
                            return res.status(500).send({ error: err });
                        }
                        return res.status(200).send({
                            message : "data stored successfylly",
                        });
                    }
                );
            })
            .end(req.file.buffer);
    } else {
        res.status(400).json({ error : "images hasn't been uploaded !" });
    }
});

router.put("/update/:id", upload.single("image"), (req, res) => {
    const data = JSON.parse(req.body.informations); //details and new image
    const imagePublicId = data.imagePublicId; //previous image id in cloud
    const productId = req.params.id; //the id of the product in the db

    //If the new image is uploaded continue
    if (req.file) {
        // Remove the previous image from Cloudinary
        cloudinary.uploader.destroy(
            imagePublicId,
            { invalidate: true },
            (error, result) => {
                if (error) {
                    return res.status(500).json({
                        error: "Couldn't remove image from the cloud!",
                    });
                }

                if (result.result !== "ok") {
                    return res
                        .status(400)
                        .json({ error: "Couldn't remove image from the cloud!"});
                }
                // Upload the new image to Cloudinary
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                error: "Couldn't upload image to the cloud!",
                            });
                        }

                        const url = result.secure_url; // URL from Cloudinary
                        const publicID = result.public_id; // Public ID from Cloudinary

                        // Update the product information in the database
                        const q = `
                        UPDATE products
                        SET title = ?, price = ?, description = ?, stock = ?, imageLink = ?, categorie = ?, imagePublicId = ?, created_at = NOW()
                        WHERE id = ?;
                    `;

                        db.query(
                            q,
                            [
                                data.title,
                                data.price,
                                data.description,
                                data.stock,
                                url,
                                data.categorie,
                                publicID,
                                productId,
                            ],
                            (err) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .json({ error: err.message });
                                }

                                return res.status(200).json({
                                    message: "Product updated successfully",
                                    newProduct : {...data  , imageLink : url , id : productId }
                                });
                            }
                        );
                    }
                );

                uploadStream.end(req.file.buffer);
            }
        );
    } else {
        res.status(400).json({
            error : "Image hasn't been uploaded!",
        });
    }
});


//
module.exports = router;
