const mongoose = require('mongoose')
const express = require('express')
const config = require('config')
const helmet = require('helmet')
const compression = require('compression')

const signup = require('./APIs/signup')
const login = require('./APIs/login')
const app = express()


app.use(express.json())
app.use(helmet())
app.use(compression())
app.use('/api/signup', signup)
app.use('/api/login',login)



mongoose.connect(config.get('db'))
.then(resolve=>console.log('Successfully Connected to Database'))
.catch(reject=>console.log('Failed to connect to Database'))

app.listen(config.get('port'), ()=>console.log(`Listning in port 3000...`))