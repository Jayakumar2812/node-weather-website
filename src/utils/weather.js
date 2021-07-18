const request = require("postman-request")
const weather =(lat,long,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=f454d32a1d6a5645c2bc3b12bd0b92af&query="+lat+","+long+'"'
    request({url,json: true},(error,{body}={}) =>{
    if (error){
        callback("unable to connect to weatherstack services",undefined)
    }
    else if(body.error){
        callback("unable to find location",undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions+". the temperature is "+body.current.temperature +". but it feelslike "+body.current.feelslike)
        }
})
}
module.exports = weather