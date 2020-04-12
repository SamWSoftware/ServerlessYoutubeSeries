const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks');

const withHooks = useHooks({
    before: [logEvent, parseEvent],
    after: [],
    onError: [handleUnexpectedError],
});

module.exports = {
    withHooks,
};
