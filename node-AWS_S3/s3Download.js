const AWS = require('aws-sdk')
const fs = require('fs')
const prompt = require('prompt-sync')()

const dotenv = require('dotenv')
dotenv.config()

const s3 = new AWS.S3({
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACESS_KEY
})

const downloadSingleFile = (fileLocation, fileName) => {
    const params = {
        Key : fileName,
        Bucket : process.env.AWS_BUCKET_NAME
    }

    s3.getObject(params, (err, data) => {
        if(err) throw err
        fs.createReadStream(fileLocation, data.Body)
        console.log(`File is stored at ${fileLocation}`)
        // console.log(data.Body)
    })
}
const key = prompt('Enter the bucket filename: ')
const localFileName = prompt('Enter the fileName you want to save: ')

downloadSingleFile(`./data/downloaded_data/${localFileName}`, key)
