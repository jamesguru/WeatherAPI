const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));



app.get("/", (req,res) =>{



    res.sendFile(__dirname + "/index.html");
    
    
});


app.post('/',(req,res) =>{

    const city = req.body.city;

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=9ae411c4a4d663206d182639c594dab8&units=metric';


    https.get(url, (response) => {

       

        response.on("data",(data)=>{

           

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp

            const icon = weatherData.weather[0].icon

            const weatherDescription = weatherData.weather[0].description


            res.send("<h2> Hi there " + city +  " has the temperature of  " + temp + "  degrees celcius and weather now is  " + weatherDescription + " </h2>");
        })
    });







});

app.listen(process.env.PORT || 4040, () => {

console.log("Server started in port : 4040");

});