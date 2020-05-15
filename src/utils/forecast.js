const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)



const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3ecbbc39b2612b38d7d4163cca9fc97&query=' + lat +',' + long +'&units=m'
    console.log(url)

    request({url: url, json: true }, (error, {body}) => {
        // const data = JSON.parse(response.body)
        // console.log(response.body.current)
        if(error){
            callback("Low level error: cannot connect to forecast service", undefined)
        }else if (body.error)
        {
            callback("Coordinate error: cannot locate coordinates", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees, and it feels like ' + body.current.feelslike + ' degrees.')
        }  
    })
}

module.exports = {
    forecast: forecast
}