const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded());

app.set("view engine", "pug");

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get("/", (req, res) => {
  res.render('index', { users })
  // res.send("Hello World!");
});

const validator = (req, res, next) => {
  let errorsArr = [];
  const { firstName, lastName, email, password, confirmedPassword } = req.body;

  if (!firstName) {
    errorsArr.push('Please provide a first name.');
  }

  if (!lastName) {
    errorsArr.push('Please provide a last name.');
  }

  if (!email) {
    errorsArr.push('Please provide an email.');
  }

  if (!password) {
    errorsArr.push('Please provide a password.');
  }

  if (password && password !== confirmedPassword) {
    errorsArr.push('The provided values for the password and password confirmation fields did not match.');
  }

  req.errors = errorsArr;
  next();
}

app.get("/create", csrfProtection, (req, res) => {
  res.render('create', { csrfToken: req.csrfToken() });
});

app.post("/create", csrfProtection, validator, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errorsArr = req.errors;
  if (errorsArr.length > 0) {
    res.render("create", { title: "Create a user", firstName, lastName, email, csrfToken: req.csrfToken(), errors: errorsArr })
    return;
  }

  users.push({ id: users.length + 1, firstName, lastName, email });
  res.redirect('/');
});

app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render('create-interesting', { csrfToken: req.csrfToken() });
});

app.post("/create-interesting", csrfProtection, validator, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword, age, favoriteBeatle, iceCream } = req.body;
  const errorsArr = req.errors;

  if (!favoriteBeatle) {
    errorsArr.push('favoriteBeatle is required')
  } else if (favoriteBeatle && (favoriteBeatle === 'Scooby-Doo')) {
    errorsArr.push('favoriteBeatle must be a real Beatle member')
  }

  if (!age) {
    errorsArr.push('age is required')
  } else if (age && (age < 0 || age > 120)) {
    errorsArr.push('age must be a valid age')
  } else if (age && isNaN(Number(age))) {
    // console.log(typeof age)
    errorsArr.push('age must be a valid age')
  }

  if (errorsArr.length > 0) {
    console.log(errorsArr)
    res.render("create-interesting", { title: "Create a user", firstName, lastName, email, age, favoriteBeatle, iceCream, csrfToken: req.csrfToken(), errors: errorsArr });
    return;
  }

  users.push({ id: users.length + 1, firstName, lastName, email, age, favoriteBeatle, iceCream: iceCream === 'on' });
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
