request = require('request')
const geocode = (address, callback) => {
    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm90aGluZ2hlcmUiLCJhIjoiY2thODluMnBoMGRlZTJzdWw1NWIwc3RkNSJ9.SemuCXVaBdgYUdMuF0Noxg&limit=1'
    request({url:geocodingUrl, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(body.features.length == 0){
            callback('unable to find location',undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })    
}

module.exports ={
    geocode : geocode,
}