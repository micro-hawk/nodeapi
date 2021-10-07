#!/bin/sh 
outputFile="./data/downloaded_data/common"
amzFile="https://vikas-testing-bucket.s3.ap-south-1.amazonaws.com/common.zip"
bucket="vikas-testing-bucket"
resource="/${bucket}/${amzFile}"
contentType="application/x-compressed-tar"
dateValue=`date -R`
stringToSign="GET\n\n${contentType}\n${dateValue}\n${resource}"
s3Key="AKIAZ4KBV6LA5KWAM3XO"
s3Secret="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"
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64`

curl  -H "Host: ${bucket}.s3.amazonaws.com" \
     -H "Date: ${dateValue}" \
     -H "Content-Type: ${contentType}" \
     -H "Authorization: AWS ${s3Key}:${signature}" \
     https://${bucket}.s3.amazonaws.com/${amzFile} -o $outputFile