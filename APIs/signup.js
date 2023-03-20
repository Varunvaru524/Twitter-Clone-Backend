let express = require('express')
let route = express.Router()

route.get('/',(request,response) => {
    response.send('signup page')
})

module.exports = route