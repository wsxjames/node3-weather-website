const request = require('request')
    // const url="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoid3N4amFtZXMiLCJhIjoiY2p5eGp0b2czMG9xeDNpbnYxb2ttcWJlNyJ9.Pw_hapGuflyYtabepu_QBA&limit=1" //after?: query string




const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid3N4amFtZXMiLCJhIjoiY2p5eGp0b2czMG9xeDNpbnYxb2ttcWJlNyJ9.Pw_hapGuflyYtabepu_QBA&limit=1'
        request({ url: url, json: true }, (error, { body }) => {

            if (error) {
                callback('Unable to connect to weather service', undefined)
            } else if (body.features.length == 0) {
                callback("invalid location", undefined)
            } else { console.log(body.features[0].center) }
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        })

    }
    // geocode('Shanghai',(error,data)=>{
    //     console.log('error: '+error)
    //     console.log("data:", data)
    // })

module.exports = geocode