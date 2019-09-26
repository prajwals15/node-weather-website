const path = require("path");
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Use the port provided by Heroku
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//render dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App Home",
        name: "Phoenix"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Phoenix"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Phoenix",
        helpMessage: "For any assistance please ping me."
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: foreCastData,
                location,
                address
            });
        });
    });
});

//Catch all for help page related 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Phoenix",
        errorMessage: "Help article not found!"
    });
});

//404 error handler - Must be defined last due to wildcard (* - Everything else)
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Phoenix",
        errorMessage: "Page Not Found!"
    });
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
});