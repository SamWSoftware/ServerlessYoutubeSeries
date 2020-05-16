import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

exports.handler = async event => {
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
    }).catch(err => {
        console.log('error in Dynamo get', err);
        return null;
    });

    return Responses._200(games);
};
