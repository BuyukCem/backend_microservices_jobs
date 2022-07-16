const AWS = require('aws-sdk')

const data = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION
}


AWS.config.update(data)

const s3 = new AWS.S3({
    accessKeyId: data.accessKeyId,
    secretAccessKey: data.secretAccessKey
})

module.exports = {s3};
