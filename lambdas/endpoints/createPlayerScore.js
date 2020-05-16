import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

exports.handler = async event => {
    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('error in Dynamo get', err);
        return null;
    });

    if (!newUser) {
        return Responses._400({ message: 'Failed to write user by ID' });
    }

    return Responses._200({ newUser });
};
