const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        let data = await s3Client.getObject(params).promise();

        if (!data) {
            throw Error(`Failed to get file ${fileName}, from ${bucket}`);
        }

        if (/\.json$/.test(fileName)) {
            data = JSON.parse(data.Body.toString());
        }
        return data;
    },
    async write(data, fileName, bucket, ACL, ContentType) {
        const params = {
            Bucket: bucket,
            Body: Buffer.isBuffer(data) ? data : JSON.stringify(data),
            Key: fileName,
            ACL,
            ContentType,
        };
        console.log('params', params);

        const newData = await s3Client.putObject(params).promise();

        if (!newData) {
            throw Error('there was an error writing the file');
        }

        return newData;
    },

    async getSignedURL(bucket, fileName, expriySeconds) {
        return s3Client.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: fileName,
            Expires: expriySeconds,
        });
    },
};

export default S3;
