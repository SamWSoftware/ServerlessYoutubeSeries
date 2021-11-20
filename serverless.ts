import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'serverlessyoutubeseries',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
        bucketName: 'my-certificate-templates-${self:provider.stage}',
    },
    // Add the serverless-webpack plugin
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',

        region: 'eu-west-1',
        profile: 'serverlessUser-sws',

        apiGateway: {
            minimumCompressionSize: 1024,
            binaryMediaTypes: ['*/*'],
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            bucketName: '${self:custom.bucketName}',
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 's3:*',
                Resource: '*',
            },
        ],
    },
    functions: {
        createCertificate: {
            handler: 'src/function/createCertificate/index.handler',
            events: [
                {
                    http: {
                        method: 'post',
                        path: 'certificate',
                    },
                },
            ],
        },
    },

    resources: {
        Resources: {
            templateBucket: {
                Type: 'AWS::S3::Bucket',
                Properties: {
                    BucketName: '${self:custom.bucketName}',
                },
            },
        },
    },
};

module.exports = serverlessConfiguration;
