const request = require('request');

let geocodeAddress = (argvAddress, callback) => {
    let encodedAddress = encodeURIComponent(argvAddress);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAUhpzD68YiDV1ufHWOhrzAp0C4W8tJ0NU`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect Google services');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address!');
        } else if (body.status === 'OVER_QUERY_LIMIT') {
            callback('You have exceeded your daily request quota for this API')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitide: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
            }) 
        }
    })
}


module.exports.geocodeAddress = geocodeAddress;