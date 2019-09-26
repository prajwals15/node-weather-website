const request = require("request");
const forecast = (latitude, longitude, callback) => {
    // register at https://darksky.net/dev first to get your personalized url
    const url = "https://api.darksky.net/forecast/43d3bf8ad0898cfe1b367bfac22e0aec/" + latitude + "," + longitude + "?units=si";
    request({ url, json: true }, (error, { body }) => {
        //Handle Network Level Error
        if (error) {
            callback("Unable to connect to weather service.", undefined);
        } else if (body.error) {
            //Handle Error from the service
            callback("Unable to find location because " + body.error, undefined);
        } else {
            //Everything went fine :)
            const currently = body.currently;
            callback(undefined, body.daily.data[0].summary + " It is currently " + currently.temperature + " degrees out. There is a " + currently.precipProbability + "% chance of rain");
        }

    });

}

module.exports = forecast;