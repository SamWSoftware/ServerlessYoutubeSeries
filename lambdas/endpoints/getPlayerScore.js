import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

exports.handler = async event => {
    if (!event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo get', err);
        return null;
    });

    if (!user) {
        return Responses._204({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user });
};
