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
        callback(undefined," : "+body.current.weather_descriptions+". The temperature is "+body.current.temperature +" But it feels like "+body.current.feelslike+". Chances of raining is "+body.current.precip+". Humdity: "+body.current.humidity+"%. Cloud coverage:"+body.current.cloudcover+"%. Wind speed is "+body.current.wind_speed+" Km/hr.")
        }
})
}
module.exports = weather