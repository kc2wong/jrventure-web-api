import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

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

    new s3.Bucket(this, 'JrVentureMediaUploadBucket', {
      bucketName: 'jr-venture-media-upload-bucket',
      lifecycleRules: [
        {
          expiration: Duration.hours(1),
          enabled: true,
        },
      ],
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // For dev/test only
      autoDeleteObjects: true, // Needs permissions for destroy
      cors: [
        {
          allowedMethods: [HttpMethods.PUT, HttpMethods.POST, HttpMethods.GET, HttpMethods.DELETE, HttpMethods.HEAD],
          allowedOrigins: [
            'http://localhost:3000',
            process.env.CORS_ORIGIN!,
          ],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag'],
        },
      ],      
    });
  }
}
