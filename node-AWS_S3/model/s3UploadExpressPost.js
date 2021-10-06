const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid').v4

const router = express.Router()

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
const multipleUpload = multer({ storage }).array('file');


router.post('/upload', upload, (req, res) => {
    let myFile = req.file.originalname.split('.')
    const fileType = myFile[myFile.length - 1]

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

module.exports = router