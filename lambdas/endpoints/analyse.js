const Response = require('../common/API_Responses');
const AWS = require('aws-sdk');

const Comprehend = new AWS.Comprehend();

exports.handler = async event => {
    const body = JSON.parse(event.body);

    if (!body || !body.text) {
        return Response._400({ message: 'no text field on the body' });
    }

    const text = body.text;

    const params = {
        LanguageCode: 'en',
        TextList: [text],
    };

    try {
        const entityResults = await Comprehend.batchDetectEntities(params).promise();
        const entities = entityResults.ResultList[0];

        const sentimentResults = await Comprehend.batchDetectSentiment(params).promise();
        const sentiment = sentimentResults.ResultList[0];

        const responseData = {
            entities,
            sentiment,
        };
        console.log(responseData);

        return Response._200(responseData);
    } catch (error) {
        console.log('error', error);
        return Response._400({ message: 'failed to work with comprehend' });
    }
};
