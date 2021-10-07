const dotenv = require('dotenv')
dotenv.config()
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

const uploadSingleFile = (fileLocation, filename ) => {
    const fileContent = fs.createReadStream(fileLocation)

    const params = {
        Bucket : process.env.AWS_BUCKET_NAME,
        Key : filename,
        Body : fileContent
    }

    s3.upload(params, (err, data) => {
        if(err) throw err
        console.log(`File is successfully uploaded at ${data.Location}`)
    })
}

uploadSingleFile('./data/knowledge_base.zip', 'knowledge_base.zip')