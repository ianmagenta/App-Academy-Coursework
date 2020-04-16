const express = require('express');
const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


router.get("/", (req, res) => {
    res.json({ message: "test index root" });
});




module.exports = router;
