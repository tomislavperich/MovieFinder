var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");


// Get yours at https://omdbapi.com/
var APIKEY = process.env.apikey;


app.get("/", function(req,res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    if (query == "") {
        var url = `https://omdbapi.com/?s=&apikey=${APIKEY}`;
        res.send("alert('Please enter a movie name')");
    } else {
        var url = `https://omdbapi.com/?s=${query}&apikey=${APIKEY}`;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                res.render("results", {data: data});
            }
        });
    }
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("[+] Server started");
    console.log(`[i] Using API key: ${APIKEY}`);
});