function uuidGenerate() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

export class S3Uploader {
    constructor(s3, config, bucket) {
        const {
            uploadParams = {},
            concurrencyOptions = {},

        } = config;

        this._bucket = bucket
        this._s3 = s3;
        this._filenameTransform = uuidGenerate();
        this._uploadParams = uploadParams;
        this._concurrencyOptions = concurrencyOptions;
    }

    /**
     * @param {string} base64 image
     * @params {string} basekey AWS folder
     * */
    async upload(file, baseKey, contentType) {
        const buffer = new Buffer.from(file, 'base64');
        const fileType = contentType.split('/')[1];

        const params = {
            Bucket: this._bucket,
            Key: `${baseKey}/${this._filenameTransform}`.concat('.').concat(fileType),
            Body: buffer,
            ContentType: contentType
        }
        try {
            let data = await this._s3.upload(params).promise()
            const res = data.key.replace(baseKey + '/', "");
            console.log(data)
            return {key: res}
        } catch (err) {
            console.log(err)
            return err
        }
    }

    /**
     * @param {string} base64 image
     * @params {string} basekey AWS folder
     * */
    async deleteObject(fileName, baseKey) {

        const params = {
            Bucket: this._bucket,
            Key: `${baseKey}/${fileName}`
        };

        try {
            let data = this._s3.deleteObject(params)
            return data
        } catch (err) {
            return err
        }

    }
}
