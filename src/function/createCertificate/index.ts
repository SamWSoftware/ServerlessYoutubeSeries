import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { PDFDocument, TextAlignment } from 'pdf-lib';
import { S3 } from 'aws-sdk';

const s3 = new S3();

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const body = JSON.parse(Buffer.from(event.body, 'base64').toString());

        const template = await s3
            .getObject({
                Bucket: process.env.bucketName,
                Key: body.certificateTemplate,
            })
            .promise();

        const pdfDoc = await PDFDocument.load(template.Body.toString('base64'));

        const form = pdfDoc.getForm();
        form.getTextField('name').setAlignment(TextAlignment.Center);
        form.getTextField('name').setText(body.name);

        form.flatten();

        const pdfOut = await pdfDoc.saveAsBase64();

        return {
            statusCode: 200,
            body: pdfOut,
            isBase64Encoded: true,
            headers: {
                'Content-Type': 'application/pdf',
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message,
            }),
        };
    }
};
