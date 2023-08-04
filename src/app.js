const express = require('express')
const app = express();
const path = require('path')
const request = require('request')
var hbs = require('hbs')
const geocode=require('./tools/geocode')
const forecast=require('./tools/forecast')

const port=process.env.PORT || 3000

app.set('view engine' , 'hbs')

const viewDirectory=path.join(__dirname ,'../temp1/views')
app.set('views' , viewDirectory)

const partialsPath=path.join(__dirname ,'../temp1/partials')
hbs.registerPartials(partialsPath)

   
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))



app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "this is home page"
    })
})
//weather page

app.get('/weather' ,(req , res)=>{
    res.render('weather' ,{
        message:"hello"

       
    })
})


app.get('/ch-weather' , (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }
   geocode(req.query.address ,(error,data)=>{
      if(error){
          return res.send({error})
      }
      forecast(data.latitude , data.longitude ,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecastF: forecastData,
            location: req.query.address,
            latitude: data.latitude,
            longitude: data.longitude
        })
      })
   })
})













app.get('*', (req, res) => {
    res.send('404 page not found')
})


app.listen(port ,()=>{
    console.log(`Example app listen on port ${port}`)
})











    

