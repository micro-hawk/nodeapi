const AWS = require('aws-sdk')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const s3 = new AWS.S3({
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACESS_KEY
})

const params = {
    Bucket : process.env.AWS_BUCKET_NAME,
    Key : 'common.zip'
}

async function downloadFile() {
    const url = await s3
    .getSignedUrlPromise('getObject', params)
    .catch((err) => {
      logger.error(err);
    });
    // please note that the responseType is stream

    const res = await axios.get(url, {
        responseType: 'stream',
      });
      // receive the data as a read stream
    const istream = res.data;
    
    // create a write stream with the path including file name and its extension that you want to store the file in your directory.
    const ostream = fs.createWriteStream('./data/downloaded_data/common.zip');
    
    // using node.js pipe method to pipe the writestream
    istream.pipe(ostream);
}

downloadFile()


