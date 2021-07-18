const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const weather = require("./utils/weather.js")
const { title } = require("process")
const app = express()
const port =process.env.PORT || 3000
const viewspath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialspath)
publicdirpath = path.join(__dirname, '../public')
app.use(express.static(publicdirpath))
app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather forecast for tonight: DARK ",
        name:"jayakumar",
        pg:"1"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"jayakumar",
        pg:"2"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        message:"help me!,JK",
        title:"HELP",
        name:"jayakumar",
        pg:"3"
    })
})
app.get("/weather",(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"error please prvoide an address to search for"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        weather(latitude,longitude,(error,forecastdata)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address : req.query.address
            })
        })
    })
 
})
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"error you must provide a search term"
        })
    }
    res.send({
        products:[]
    })
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        error:"help article not found",
        title:"Error",
        name:"jayakumar"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        error:"page not found",
        title:"Error ",
        name:"jayakumar"
    })
})
app.listen(port,()=>{
    console.log("server is up and running on port "+port)
})
