const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const ejs = require('ejs');

const app =express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.listen(3000,function(){
    console.log("Server Application is runnig on port 3000");
});

//get Request handlers

app.get("/",function(req,res){

    res.sendFile(__dirname+"/Index.html");

});

app.post("/getWeatherData",function(req,res){

    var city=req.body.cityName;

    console.log(city);

    if(city=="")
    {
        res.redirect("/");
    }
    else //it means city name is defined
    {   


    const apiKey="17ae0bd3adcf064d17e76e506bd4f95c";
   
    //logic to send get request to another server application

    const apiUrl="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
    
    https.get(apiUrl,function(responseFromOthersServerApp){

        console.log(responseFromOthersServerApp.statusCode);
        
        //to get a actual data in response object which is send by api
        responseFromOthersServerApp.on("data",function(data){
            console.log(data);
            //conversion of data to javascript object format
            var dataInJsObjectFormat=JSON.parse(data);
            console.log(dataInJsObjectFormat);

            var temprature=dataInJsObjectFormat.main.temp;
            console.log(temprature);

                    
            //res.send("Current Temprature Of "+city+" is :"+temprature);

            res.render("result.ejs",{Temprature:temprature,CityName:city});

        })

    })

    }
    



})



app.post("/goToHomePage",function(req,res){

    res.redirect("/");
})