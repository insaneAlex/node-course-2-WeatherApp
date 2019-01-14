const yargs = require('yargs');
const axios = require('axios');
const fs = require('fs');

let argv = yargs
    .options({
        a: {
            alias: 'address',
            describe: 'address to fetch weather for',
            string: true,
            default: 'Рава-Руська'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyB8C1zrCnnU-XEW4Ti4VLRkmLLYju-Bb08`;

axios.get(geocodeURL).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        } else if (response.data.status === 'OVER_QUERY_LIMIT') {
            throw new Error('You have exceeded your daily request quota for this API.');
        }
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherAddress = `https://api.darksky.net/forecast/fa05e09088ebe8ac960ba871dcea3063/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherAddress)
            .then((response) => {
                let temperature = response.data.currently.temperature;
                let apparentTemperature = response.data.currently.apparentTemperature;
                console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}`);
            })
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    })