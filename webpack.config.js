// webpack.config.js
const slsw = require('serverless-webpack');

module.exports = {
    target: 'node',
    mode: 'none',
    entry: slsw.lib.entries,
};
