const dotenv = require('dotenv')
dotenv.config()
const s3upload = require('./model/s3Upload')
const express = require('express')


const app = express()
const appPort = 3000

app.use('/', s3upload)


app.listen(appPort, () => {console.log(`Your app is running on ${appPort}`)})


