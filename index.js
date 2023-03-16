const express = require('express')
const app = express()


app.get('/',(request,response)=>{
    response.send('hellow world')
})

app.listen(3000, ()=>console.log(`Listning in port 3000...`))