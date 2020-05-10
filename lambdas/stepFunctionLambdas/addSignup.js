import Dynamo from '../common/Dynamo';
import { v4 as uuid } from 'uuid';

const tableName = process.env.signupTableName;

exports.handler = async event => {
    console.log('event', event);

    const email = event.Input.signup.email;
    const ID = uuid();

    await Dynamo.write({ ID, email, played: 'false' }, tableName);

    return { ID };
};
