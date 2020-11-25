const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    target: 'node',
    mode: 'none',
    entry: slsw.lib.entries,
    externals: [nodeExternals()]
};