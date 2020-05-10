import Responses from '../common/API_Responses';
import Dynamo from '../common/Dynamo';

const tableName = process.env.tableName;

exports.handler = async event => {
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
