const express = require("express");
const router = express.Router();
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require("express-validator");


const loginValidators = [
    check("emailAddress")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address'),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')

];


router.get("/user/login", csrfProtection, asyncHandler(async (req, res) => {
    const user = db.User.build();
    res.render("user-login", { title: "Login", user, token: req.csrfToken() });
}));

router.post("/user/login", csrfProtection, loginValidators, asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;
    // const user = db.User.build({ emailAddress, firstName, lastName });
    const validatorErrors = validationResult(req);
    const errors = [];
    if (validatorErrors.isEmpty()) {
        const user = await db.User.findOne({ where: { emailAddress } });

        const match = bcrypt.compare(password, user.hashedPassword.toString());
        if (match) {
            //login user
            res.redirect("/");
        }
        // const hashedPassword = await bcrypt.hash(password, 8);
        // user.hashedPassword = hashedPassword;
        // await user.save();
        // res.redirect("/");
        errors.push('Login failed for the provided email address and password');
    } else {
        errors = validatorErrors.array().map(error => error.msg);
        res.render("user-login", { title: "Login", emailAddress, errors, token: req.csrfToken() });
    }

}));


router.get("/user/register", csrfProtection, asyncHandler(async (req, res) => {
    const user = db.User.build();
    res.render("user-register", { title: "Register", user, token: req.csrfToken() });
}));

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for First Name')
        .isLength({ max: 50 })
        .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ max: 50 })
        .withMessage('Last Name must not be more than 50 characters long'),
    check('emailAddress')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email')
        .custom((value) => {
            return db.User.findOne({ where: { emailAddress: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account');
                    }
                });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        }),
];

router.post("/user/register", csrfProtection, userValidators, asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, password } = req.body;
    const user = db.User.build({ emailAddress, firstName, lastName });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(password, 8);
        user.hashedPassword = hashedPassword;
        await user.save();
        res.redirect("/");
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render("user-register", { title: "Register", user, errors, token: req.csrfToken() });
    }

}));

module.exports = router;
