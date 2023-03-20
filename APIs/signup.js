const jwt = require('jsonwebtoken')
const config = require('config')
let express = require('express')
let route = express.Router()
const UsersModel = require('../Models/Users')

route.post('/',(request,response) => {
    new UsersModel(request.body)
    .save()
    .then(resolve=>{
        // Sending JWT Token
        let payload = {
            firstName:resolve.firstName,
            lastName:resolve.lastName,
            userName:resolve.userName,
            email:resolve.email
        }
        let token = jwt.sign(payload, config.get('jwt'))
        response.send(token)
    })
    .catch(reject=>{response.send(reject.message)})
})

module.exports = route
