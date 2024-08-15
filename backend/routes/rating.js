const router = require("express").Router();
const db = require("../database/db");
//
router.put("/" , (req , res ) => {
    const { productId , userId } = req.query;
    const rating = req.body.rating ;
    //select the tuple where the same user rate the same product
    const q = "Select id from rates where user_id=? and product_id=?;"
    db.query(q , [userId , productId ] , (err , data) => {
        if (err) return res.status(500).json({error : err});
        if (data.length !== 0 ){
            //if it is there , so update the rating
            const query =
                "update  rates set rating=? where id=? and user_id=? and product_id=?";
            const rateID = data[0].id;
            //
            db.query(query , [rating ,rateID , userId ,productId] , (err , result) => {
                if (err) return res.status(500).json({error  : err});
                return res.status(200).json({message : 'rating updated successfully.'});
            });
        } else {
            //else insert the rating
            const query =
                "INSERT INTO rates (id , user_id , product_id, rating ) VALUES (uuid() , ? ,? , ?);";
            
            db.query(query , [userId , productId , rating] , (err , result) => {
                if (err) return res.status(500).json({error : err});
                return res.status(200).json({message : 'rating setted successfully'});
            })
        }
    })
})

module.exports = router;
