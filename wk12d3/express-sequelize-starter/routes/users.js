const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { asyncHandler, handleValidationErrors } = require('../utils');
const { check } = require("express-validator");
const { getUserToken, requireAuth } = require('../auth');

const router = express.Router();

const validateUsername =
    check("username")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a username");

const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
];

router.post("/", validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({ username, email, hashedPassword });
    const token = await getUserToken(user);
    res.status(201).json({
        user: { id: user.id },
        token,
    });
})
);

router.post(
    "/token",
    validateEmailAndPassword,
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: {
                email,
            },
        });
        // TODO: Password validation and error handling
        // TODO: Token generation
        if (!user || !user.validatePassword(password)) {
            const err = new Error("Login failed");
            err.status = 401;
            err.title = "Login failed";
            err.errors = ["The provided credentials were invalid."];
            return next(err);
        }
        const token = getUserToken(user);
        res.json({ token, user: { id: user.id } });
    })
);

router.get(
    "/:id/tweets",
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const tweets = await db.Tweet.findAll({
            where: {
                userId: req.params.id,
            },
        });
        res.json({ tweets });
    })
);

module.exports = router;
