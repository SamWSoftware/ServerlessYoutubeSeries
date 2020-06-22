import Responses from '../common/API_Responses';
import * as fileType from 'file-type';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];

exports.handler = async event => {
    try {
        const body = JSON.parse(event.body);

        if (!body || !body.image || !body.mime) {
            return Responses._400({ message: 'incorrect body on request' });
        }

        if (!allowedMimes.includes(body.mime)) {
            return Responses._400({ message: 'mime is not allowed ' });
        }

        let imageData = body.image;
        if (body.image.substr(0, 7) === 'base64,') {
            imageData = body.image.substr(7, body.image.length);
        }

        const buffer = Buffer.from(imageData, 'base64');
        const fileInfo = await fileType.fromBuffer(buffer);
        const detectedExt = fileInfo.ext;
        const detectedMime = fileInfo.mime;

        if (detectedMime !== body.mime) {
            return Responses._400({ message: 'mime types dont match' });
        }

        const name = uuid();
        const key = `${name}.${detectedExt}`;

        console.log(`writing image to bucket called ${key}`);

        await s3
            .putObject({
                Body: buffer,
                Key: key,
                ContentType: body.mime,
                Bucket: process.env.imageUploadBucket,
                ACL: 'public-read',
            })
            .promise();

        const url = `https://${process.env.imageUploadBucket}.s3-${process.env.region}.amazonaws.com/${key}`;
        return Responses._200({
            imageURL: url,
        });
    } catch (error) {
        console.log('error', error);

        return Responses._400({ message: error.message || 'failed to upload image' });
    }
};
