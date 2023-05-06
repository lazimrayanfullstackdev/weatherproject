const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");    
});

app.post("/",function(req,res){
    const apiKey = "a635996d9b91419dc6bf88e93047194c";
    const q = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid="+apiKey+"&units="+units;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);//parsing the api data in json format
            //console.log(weatherdata);
            const temp = weatherdata.main.temp;//location of the temperature from api
            res.write("<h1>The temperature of " +q+" is "+temp+" degree Celcius</h1>");
            const weatherdescription = weatherdata.weather[0].description;//location of the description from api
            res.write("<p>The weather condition of "+q+" is "+weatherdescription+"</p>");
            let iconpath = "https://openweathermap.org/img/wn/";
            let icon = weatherdata.weather[0].icon;
            let iconurl = iconpath+icon+"@2x.png";
            res.write("<img src="+iconurl+">");
        })
    });
})



app.listen(3000);