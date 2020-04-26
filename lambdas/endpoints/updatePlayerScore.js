const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const { withHooks, hooksWithValidation } = require('../common/hooks');
const yup = require('yup');

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
    score: yup.number().required(),
});

const pathSchema = yup.object().shape({
    ID: yup.string().required(),
});

const handler = async event => {
    let ID = event.pathParameters.ID;
    const { score } = event.body;

    const res = await Dynamo.update({
        tableName,
        primaryKey: 'ID',
        primaryKeyValue: ID,
        updateKey: 'score',
        updateValue: score,
    });

    return Responses._200({});
};

exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler);
