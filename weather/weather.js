const request = require('request');

let getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/fa05e09088ebe8ac960ba871dcea3063/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
            debugger;
        } else {
            callback('Unable to fetch weather')
        }
    });
}

module.exports.getWeather = getWeather;