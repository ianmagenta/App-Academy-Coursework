const express = require("express");
const routes = require("./routes");
const app = express();


app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.get('/*xyz', (req, res) => {
    res.send("That's all I wrote.");
});

app.get('/capital-letters/:word', (req, res) => {
    res.send(req.params.word.toUpperCase());
});

app.use('/margot', routes);
app.use('/margeaux', routes);

app.all(/^\/[a-zA-Z0-9]/, (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);

    res.render('layout', { method: req.method, path: req.path, randomNumber });
});


const port = 8081;

app.listen(port, () => console.log(`Listening on Port...${port}`));