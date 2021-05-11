const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5005
const booksDS = require('./lib/booksDS')
const route = require('./routes/route')

booksDS.init()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', route)

app.listen(port, console.log(`Server started at port ${port}`))