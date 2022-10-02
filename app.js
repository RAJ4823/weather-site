const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { watch } = require('fs');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (re1, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post("/", (req, res) => {
    // console.log("POST");
    const cityName = req.body.cityName;
    const key = '57c5cdeb6ab72b7163b77bbe03a5c074';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName+ "&appid=" + key+ "&units=metric";

    //Will get all information
    https.get(url, (response) => {
        // console.log('Status : ', response.statusCode);

        //Will get only DATA
        response.on("data", (data) => {
            //For converting data to JSON
            const weatherData = JSON.parse(data);
            // console.log(weatherData);

            const iNum = weatherData.weather[0].icon;
            const icon = "http://openweathermap.org/img/wn/" + iNum + "@2x.png";

            res.write(`<!doctype html>
            <html lang="en">
            
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <!-- Bootstrap CSS -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <link rel="stylesheet" href="/styles.css">
                <link rel="stylesheet" href="/theme.css">
            
                <title>Weather Site</title>
            </head>
            
            <body>
                <div class="container">
            
                    <div class="card text-center">
                        <div class="card-header h5">
                            Weather Site
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${cityName}</h5>
                            <p class="card-text">${weatherData.weather[0].description}</p>
            
                            <div class="text-center">
                                <img src="${icon}" class="w-40" alt="icon">
                            </div>
            
                            <div class="weather-info d-flex flex-lg-row justify-content-center">
                                <div class="detail my-2 px-lg-4 px-3">
                                    <div class="title h4">Wind</div>
                                    <div class="value h3">${weatherData.wind.speed}</div>
                                </div>
            
                                <div class="detail my-2 px-lg-4 px-3 middle">
                                    <div class="title h4">Temperature</div>
                                    <div class="value h3">${weatherData.main.temp}</div>
                                </div>
            
                                <div class="detail my-2 px-lg-4 px-3">
                                    <div class="title h4">Humidity</div>
                                    <div class="value h3">${weatherData.main.humidity}</div>
                                </div>
                            </div>
            
                            <form action="/" method="post">
                                <input id="input" name="cityName" class="form-control w-50 mx-auto my-3 text-primary" type="text"
                                    placeholder="City Name" aria-label="default input example">
                                <!-- <a id="btn" type="submit" class="btn btn-primary text-light m-2">Search</a> -->
                                <button id="btn" type="submit" class="btn btn-primary text-light m-2">Search</button>
                            </form>
            
                        </div>
            
                        <div class="card-footer">
                            Powered by <a href="https://openweathermap.org/api" class="text-primary">openweather</a>
                        </div>
                    </div>
                </div>
                <!-- Bootstrap JS -->
            
                <script src="script.js"></script>
            
            
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
                    integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
                    crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
                    integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
                    crossorigin="anonymous"></script>
            
            </body>
            
            </html>`)
            res.send();
            // res.write("icon : ", icon);
        })
    })
})


app.listen(8000, () => {
    console.log('Server is live on http://localhost:8000/');
});

//link : https://api.openweathermap.org/data/2.5/weather?q=ahmedabad&appid=57c5cdeb6ab72b7163b77bbe03a5c074&units=metric;
//api key : 57c5cdeb6ab72b7163b77bbe03a5c074
//formate : https://api.openweathermap.org/data/2.5/weather?q= + "cityName" + &appid=" + key+ "&units=metric
