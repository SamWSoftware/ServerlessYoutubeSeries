const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const { withHooks } = require('../common/hooks');

const tableName = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.playerID) {
        // failed without a playerID
        return Responses._400({ message: 'missing the playerID from the path' });
    }

    const playerID = event.pathParameters.playerID;

    let filterExpression = `playerID = :playerID`;
    let expressionAttributes = {
        ':playerID': playerID,
    };

    if (event.queryStringParameters && event.queryStringParameters.minScore) {
        const minScore = event.queryStringParameters.minScore;
        filterExpression = `playerID = :playerID and score >= :minScore`;
        expressionAttributes = {
            ':playerID': playerID,
            ':minScore': Number(minScore),
        };
    }

    const games = await Dynamo.scan({
        tableName,
        filterExpression,
        expressionAttributes,
    });

    return Responses._200(games);
};

exports.handler = withHooks(handler);
