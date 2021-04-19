require('dotenv').config()

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index");
});

app.post("/",function(req,res){
    // to write the option that is selected by user :-
    // console.log(req.body.crypto);
    // console.log(req.body.fiat);
    var crypto = req.body.crypto;

    var fiat = req.body.fiat;

    var amount = req.body.amount;

    // var url = "https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=2"

    var options = {
        url : "https://apiv2.bitcoinaverage.com/convert/global",
        method : "GET",
        qs : {
            from : crypto,
            to : fiat,
            amount : amount
        },
        headers : {
            'x-ba-key': 'YTIxN2YyNjgzYjIzNGRhN2E5ZTBjMzVjMjkyNTNkZWM'
        }
    }

    request(options,function(err,response,body){
        
        var data = JSON.parse(body);

        var price = data.price;

        var currentTime = data.time;

        // res.write("<p>The current date and time is " + currentTime + "</p>");

        // res.write("<h1> The current price of "  + amount + " "+crypto+" is "+price+" in "+fiat+"</h1>")

        res.render("result",{time: currentTime, amount: amount, crypto: crypto, price: price, fiat: fiat})

    });

})

app.listen(process.env.PORT || port,function(req,res){
    console.log(`Server is running on port ${port}.`);
});

