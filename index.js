const mongoose = require('mongoose')
const express = require('express')
const app = express()
const config = require('config')

app.use(express.json())


let schema = new mongoose.Schema({
    name:String
})
let Model = mongoose.model('testing',schema)
let doc = new Model({name:'Varun'})

app.get('/',(request,response)=>{
    doc.save().then(resolve=>{
        response.send('hello world')
    }).catch(reject=>{
        response.send('Something Wrong')
    })
})


mongoose.connect(config.get('db'))
.then(resolve=>console.log('Successfully Connected to Database'))
.catch(reject=>console.log('Failed to connect to Database'))

app.listen(config.get('port'), ()=>console.log(`Listning in port 3000...`))