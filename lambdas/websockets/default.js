const Responses = require('../common/API_Responses');

exports.handler = async event => {
    console.log('event', event);

    return Responses._200({ message: 'default' });
};
