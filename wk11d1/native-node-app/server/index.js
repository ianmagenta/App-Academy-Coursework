const { readFile } = require('fs').promises;
const { Item } = require('../models');
const path = require('path');
const http = require('http');
const hostname = '127.0.0.1';
const port = 8081;

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith("/images")) {
        const imageFilePath = './assets' + req.url;
        let imageFileContents;
        try {
            imageFileContents = await readFile(imageFilePath);
        } catch (err) {
            // console.error(err);
            res.statusCode = 404;
            res.end();
        }
        const fileExtension = path.extname(imageFilePath);
        const imageType = 'image/' + fileExtension.substring(1);
        res.statusCode = 200;
        res.setHeader('Content-Type', imageType); // Use the image type
        res.end(imageFileContents);
        return;
    }

    if (req.url.startsWith("/items/new")) {
        const htmlFilePath = './views/add-item.html';
        let htmlFileContents;
        try {
            htmlFileContents = await readFile(htmlFilePath);
        } catch (err) {
            // console.error(err);
            res.statusCode = 404;
            res.end();
        }
        const fileExtension = path.extname(htmlFilePath);
        const htmlType = 'text/' + fileExtension.substring(1);
        res.statusCode = 200;
        res.setHeader('Content-Type', htmlType); // Use the html type
        res.end(htmlFileContents);
        return;
    }

    if (req.url === "/items" && req.method === "POST") {
        let body = '';
        for await (let chunk of req) {
            body += chunk;
        }
        const keyValuePairs = body.split('&')
            .map(keyValuePair => keyValuePair.split('='))
            .map(([key, value]) => [key, value.replace(/\+/g, ' ')])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        Item.create(keyValuePairs);
        // keyValuePairs = { name: 'test', description: 'some test', amount: '10' }
        res.statusCode = 302;
        res.setHeader('Location', "/");
        res.end();
        return;
    }

    let numberItem = await Item.findAll();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'html');
    res.end(`<div><a href="/items/new">Add a new item</a></div>
    I have ${numberItem.length} items`);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// const http = require('http');
// const { readFile } = require('fs').promises;
// const path = require('path');

// const server = http.createServer(async (req, res) => {
//     const ext = path.extname(req.url);
//     console.log(ext);

//     let content;
//     if (req.method === 'POST') {
//         let bodyContent = '';
//         for await (let chunk of req) {
//             bodyContent += chunk;
//         }
//         const keyValuePairs = bodyContent.split('&')
//             .map(keyValuePair => keyValuePair.split('='))
//             .map(([key, value]) => [key, value.replace(/\+/g, ' ')])
//             .map(([key, value]) => [key, decodeURIComponent(value)])
//             .reduce((acc, [key, value]) => {
//                 acc[key] = value;
//                 return acc;
//             }, {});
//         console.log(keyValuePairs);
//         // const [fieldName, encodedFieldValue] = bodyContent.split('=');
//         // const spacesFieldValue = encodedFieldValue.replace(/\+/g, ' ');
//         // const fieldValue = decodeURIComponent(spacesFieldValue);
//         content = `<h1>I got your request</h1>`;
//         for (let [key, value] of Object.entries(keyValuePairs)) {
//             content += `<p>You sent ${key} with the value ${value}</p>`;
//         }
//         content += `<a href="/">GO BACK!</a>`;
//         res.setHeader('Content-Type', 'text/html');
//     } else if (ext === '.jpg') {
//         console.log(req.url);

//         content = await readFile(`./images/${req.url}`); // dynamic
//         res.setHeader('Content-Type', 'image/jpeg');
//     } else {
//         content = await readFile('./example.html');
//         res.setHeader('Content-Type', 'text/html');
//     }

//     res.statusCode = 200;
//     res.end(content);
// });

// const port = 8081;

// server.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
