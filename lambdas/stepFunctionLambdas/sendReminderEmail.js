import * as AWS from 'aws-sdk';

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event', event);

    const email = event.Input.Payload.email;

    const message = `Hi,
    
We saw that you signed up for our gaming platform but haven't played yet.

We hope you play soon`;

    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: { Data: message },
            },
            Subject: { Data: 'Remember to use the gaming platform' },
        },
        Source: 'serverlessfullstack@gmail.com',
    };

    try {
        await SES.sendEmail(params).promise();
        return;
    } catch (error) {
        console.log('error sending email ', error);
        throw error;
    }
};
