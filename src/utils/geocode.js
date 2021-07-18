const request = require("postman-request")
const geocode =(address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiamF5YWt1bWFyMjgxMiIsImEiOiJja3I2ZnNnZjEyeTJzMndueHFoODVmNW5hIn0.tZluhe6lREIafKFCKetsbw&limit=1"
request({url,json : true},(error,{body}={})=>{
    if(error){
        callback("unable to access mapbox",undefined)
    }
    else if(body.message){
        callback("place not specified",undefined)
    }
    else if (body.features.length === 0){
        callback("place not found,try bigger area",undefined)
    }
    else{ 
        callback(undefined,{
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location:body.features[0].place_name
        })
    }

})

}
module.exports = geocode