import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

exports.handler = async event => {
    if (!event.pathParameters.game) {
        // failed without a game
        return Responses._400({ message: 'missing the game from the path' });
    }

    const game = event.pathParameters.game;

    const gamePlayers = await Dynamo.query({
        tableName,
        index: 'game-index',
        queryKey: 'game',
        queryValue: game,
    }).catch(err => {
        console.log('error in Dynamo get', err);
        return null;
    });

    return Responses._200(gamePlayers);
};
