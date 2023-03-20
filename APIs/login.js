let express = require('express')
let route = express.Router()

route.get('/',(request,response)=>{
    response.send('Login page')
})

module.exports = route