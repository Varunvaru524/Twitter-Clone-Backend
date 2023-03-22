const config = require('config')
const jwt = require('jsonwebtoken')
const express = require('express')
const route = express.Router()
const UserModel = require('../Models/Users')

route.post('/', (request, response) => {
    const { email, password } = request.body

    UserModel.find({ email, password })
        .then(resolve => {
            if (resolve.length == 0) {
                response.status(404).send('Invalid Email or Password')
            }
            else{
                // Sending JWT Token
                let payload = {
                    firstName: resolve[0].firstName,
                    lastName: resolve[0].lastName,
                    userName: resolve[0].userName,
                    email: resolve[0].email
                }
                let token = jwt.sign(payload, config.get('jwt'))
                response.send(token)
            }
        })
        .catch(reject => { response.status(400).send('Something failed, Please try again later') })
})

module.exports = route