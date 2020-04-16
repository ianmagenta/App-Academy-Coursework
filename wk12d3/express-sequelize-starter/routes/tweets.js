const express = require('express');
const router = express.Router();
const db = require("../db/models");
const { Tweet } = db;
const { check, validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

function tweetNotFoundError(id) {
    const err = new Error(`Could not find Tweet ID ${id}`);
    err.title = "Tweet not found."
    err.status = 404;
    return err;
}

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();
};

const tweetValidators = [
    check('message')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid message value")
        .isLength({ max: 280 })
        .withMessage("Please provide a message no greater than 280 characters"),
];

router.get("/", asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll({ order: ["id"] });
    res.json({ tweets });
}));

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        res.json({ tweet });
    } else {
        const err = tweetNotFoundError(tweetId);
        next(err);
    }
}));

router.post("/", tweetValidators, handleValidationErrors, asyncHandler(async (req, res) => {
    const { message } = req.body;
    const tweet = await Tweet.create({
        message
    });
    res.json({ tweet });
}));

router.put("/:id(\\d+)", tweetValidators, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    const { message } = req.body;
    const tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        tweet.message = message;
        await tweet.save();
        res.json({ tweet });
    } else {
        const err = tweetNotFoundError(tweetId);
        next(err);
    }

}));

router.delete("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByPk(tweetId);
    if (tweet) {
        await tweet.destroy();
        res.status(204).end();
    } else {
        const err = tweetNotFoundError(tweetId);
        next(err);
    }
}));

module.exports = router;
