const mongoose = require('mongoose')
const express = require('express')
const app = express()
const config = require('config')



app.get('/',(request,response)=>{
    response.send('hellow world')
})

mongoose.connect(config.get('db'))
.then(resolve=>console.log('Successfully Connected to Database'))
.catch(reject=>console.log('Failed to connect to Database'))

app.listen(config.get('port'), ()=>console.log(`Listning in port 3000...`))