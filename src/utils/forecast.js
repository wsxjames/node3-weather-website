const request = require('request')

const forecast = (lati, long, callback) => {
    const url = 'https://api.darksky.net/forecast/960ce72d022f2f6fe2342928770f56c1/' + lati + ',' + long + '?lang=en&units=si'
        // const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid3N4amFtZXMiLCJhIjoiY2p5eGp0b2czMG9xeDNpbnYxb2ttcWJlNyJ9.Pw_hapGuflyYtabepu_QBA&limit=1'
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('invalid location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary)
        }
    })
}
module.exports = forecast