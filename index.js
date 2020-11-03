'use strict'

var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

var fetch = require('node-fetch');
var https = require('https');
var fs = require("fs");

const googleTrends = require('google-trends-api');

app.get("/", function(req, res){
    res.send("coucou");
})

var cors = require('cors');
var corsOptions = {
    origin: [
        'https://netflixbutnochill.herokuapp.com/',
        'https://juventin.github.io/DONNEESCONNECTEES2/'
    ],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


function getTrendsPerRegion() {
    //serves static files
    app.use(express.static('docs'));


    app.get("/:name", function (req, res) {
        res.send("hello : " + req.params.name);
    })

    app.get("/trends/netflix", function (req, res) {
        googleTrends.interestByRegion({
                keyword: 'netflix',
                geo: "FR",
                resolution: "REGION"
            })
            .then(function (results) {
                res.send(results);
            })
            .catch(function (err) {
                res.send('Oh no there was an error', err);
            });
    })
}

function getInformationsAboutTheCSP() {
    app.get("/cocktail/margarita", function (req, res) {
        console.log('ok')
        let url = "https://www.insee.fr/fr/statistiques/fichier/2012804/sl_etc_2020T2.xls";
        console.log('on y va')
        fetch(url)
            .then(res => res.text())
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => console.log(data))
    })
}

function getInformationsAboutTheMovie() {
    var input = document.getElementById("name");
    var result;
    var url = "https://api.betaseries.com/movies/search?title=" + input.value;
    fetch(url)
        .then(res => res.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => console.log(data))
}

app.listen(port, function () {
    console.log('Serveur listening on port ' + port);
});
