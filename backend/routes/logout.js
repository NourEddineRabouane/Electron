const router = require("express").Router();

router.get("/", (req, res) => {
    console.log('hi')
    if (req.cookies.info) {
        res.clearCookie('token');
        res.clearCookie('info');
        return res.status(200).json({ message: "log out seccessfully" });
    }
    else {
        return res.status(400).json({message: "No data in the cookies"});
    }
});

module.exports = router;
