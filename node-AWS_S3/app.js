const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const app = express()
const appPort = 3000

const s3 = new AWS.S3({
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

const storage = multer.memoryStorage({
    destination : function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('file')
app.post('/upload', upload, (req, res) => {
    let myFile = req.file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]
    // res.send({
    //     message : 'Hello World'
    // })

    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : `${uuid()}.${fileType}`,
        Body : req.file.buffer
    }
    s3.upload(params, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        res.status(200).send(data)
    } )

})

app.listen(appPort, () => {console.log(`Your app is running on ${appPort}`)})


