import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LinkedupWebApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const linkedupLambda = new lambdaNodejs.NodejsFunction(
      this,
      'LinkedupWebApiLambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: 'src/lambda/index.ts', // points to your lambda handler
        handler: 'handler',
        environment: {
          PORT: '3000', // not really needed, but some ORMs require PORT
          BACKEND_API_URL: process.env.BACKEND_API_URL!,
          CORS_ORIGIN: process.env.CORS_ORIGIN!,
          PERSPECTIVE_API_KEY: process.env.PERSPECTIVE_API_KEY!,
        },
      }
    );

    new apigateway.LambdaRestApi(this, 'LinkedupWebApiApi', {
      handler: linkedupLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: [process.env.CORS_ORIGIN!],
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['OPTIONS', 'POST'],
        allowCredentials: true,
      },
    });
  }
}
