const dotenv = require('dotenv')
dotenv.config()
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

const uploadSingleFile = () => {
    fs.readFile('./data/test.pdf', (err, data) => {
        if(err)  throw err

        const params = {
            Bucket : process.env.AWS_BUCKET_NAME,
            Key : 'test.pdf',
            Body : JSON.stringify(data, null, 2)
        }

        s3.upload(params, (s3Err, s3Data) => {
            if(s3Err) throw s3Err
            console.log(`File uploaded succefully at ${s3Data.Location}`)
        })
    })
}

uploadSingleFile()