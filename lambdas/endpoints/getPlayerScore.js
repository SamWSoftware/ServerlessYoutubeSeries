const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const { withHooks } = require('../common/hooks');

const tableName = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName);

    if (!user) {
        return Responses._404({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user });
};

exports.handler = withHooks(handler);
