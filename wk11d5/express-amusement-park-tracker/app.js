const express = require('express');
const routes = require('./routes.js');
const morgan = require('morgan');
const { environment } = require('./config');
const cparse = require('cookie-parser');

const app = express();
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cparse());
app.use(routes);


app.use((req, res, next) => {
    const err = new Error("The requests page couldn't be found.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (req.url !== "/favicon.ico") {
        if (environment) {
            // TODO Log the error to the database.
        } else {
            console.error(err);
        }
    }
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.render("page-not-found", { title: "Page Not Found" });
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === "production";
    res.render("error", {
        title: "Server Error",
        message: isProduction ? null : err.message,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;
