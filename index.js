const mongoose = require('mongoose')
const express = require('express')
const config = require('config')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const signup = require('./APIs/signup')
const login = require('./APIs/login')
const app = express()


// Unexpected Error Handling
process.on('uncaughtException',(error)=>{
    console.log('Uncaught Exceptions',error);
})
process.on('unhandledRejection',(error)=>{
    console.log('Unhandled Rejections',error);
})


// Middlewares and routes
app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(cors())
app.use('/api/signup', signup)
app.use('/api/login',login)


// To Database
mongoose.connect(config.get('db'))
.then(resolve=>console.log('Successfully Connected to Database'))
.catch(reject=>console.log('Failed to connect to Database'))

// To Server
module.exports = app.listen(config.get('port'), ()=>console.log(`Listning in port 3000...`))
