const request = require('request');

const geoCode = (address, callback) => {
    // register at https://www.mapbox.com to get your access token for finding the geolocation
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicGhvZW5peG5vZGUiLCJhIjoiY2swMHhoc2gxMXBkbjNucGs0OHh6MTByMiJ9.k5piPMExir5wexFfFls22A&limit=1";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            //Handle Network Level Error
            callback("Unable to connect to location service.", undefined);
        } else if (body.features.length === 0) {
            //Handle Error from the service
            callback("Unable to find location. Please try another location.", undefined);
        } else {
            //Everything went fine
            const features = body.features[0];
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
        }

    })

};

module.exports = geoCode;