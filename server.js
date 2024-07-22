const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

const http = require('https');

const apiKey = 'd8d4fc6df7msh19f23bbd12aeea6p19deccjsn586133354be7';


function getCards(quality, res) {
    const options = {
        method: 'GET',
        hostname: 'omgvamp-hearthstone-v1.p.rapidapi.com',
        port: null,
        path: `/cards/qualities/${quality}`,
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
        }
    };

    const req = http.request(options, function (response) {
        const chunks = [];

        response.on('data', function (chunk) {
            chunks.push(chunk);
        });

        response.on('end', function () {
            const body = Buffer.concat(chunks);
            const cards = JSON.parse(body.toString());
            

            res.render("cardList", { hero: cards });
        });
    });

    req.end();
}


app.use("/rare", function (req, res) {
    getCards('rare', res);
});


app.use("/common", function (req, res) {
    getCards('common', res);
});


app.use("/epic", function (req, res) {
    getCards('epic', res);
});

app.use("/free", function (req, res) {
    getCards('free', res);
});

app.use("/legendary", function (req, res) {
    getCards('legendary', res);
});

app.use("/", function (req, res) {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor: http://localhost/${port}`);
});
