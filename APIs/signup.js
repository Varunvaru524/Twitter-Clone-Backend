let express = require('express')
let route = express.Router()
const UsersModel = require('../Models/Users')

route.post('/',(request,response) => {
    response.send('signup page')
})

module.exports = route