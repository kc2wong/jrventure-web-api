import { Stack, StackProps, Duration, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { HttpMethods } from 'aws-cdk-lib/aws-s3';

export interface ApiStackProps extends StackProps {
  domainName: string; // e.g. 'api.kelvin-wong.cloud'
  certificate: acm.ICertificate;
}

export class LinkedupWebApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, {
      ...props,
      crossRegionReferences: true,
    });

    const linkedupLambda = new lambdaNodejs.NodejsFunction(
      this,
      'LinkedupWebApiLambda',
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        entry: 'src/lambda/index.ts', // points to your lambda handler
        handler: 'handler',
        environment: {
          PORT: '3000', // not really needed, but some ORMs require PORT
          ENV: process.env.ENV!,
          BACKEND_API_URL: process.env.BACKEND_API_URL!,
          CORS_ORIGIN: process.env.CORS_ORIGIN!,
          PERSPECTIVE_API_KEY: process.env.PERSPECTIVE_API_KEY!,
        },
      }
    );

    const api = new apigateway.LambdaRestApi(this, 'LinkedupWebApiGateway', {
      handler: linkedupLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: [process.env.CORS_ORIGIN!],
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['OPTIONS', 'POST', 'GET', 'PUT', 'DELETE'],
        allowCredentials: true,
      },
    });

    // 👇 Custom Domain
    const domain = new apigateway.DomainName(
      this,
      'LinkedupWebApiCustomDomain',
      {
        domainName: props.domainName, // e.g. 'api.kelvin-wong.cloud'
        certificate: props.certificate,
        endpointType: apigateway.EndpointType.EDGE,
        securityPolicy: apigateway.SecurityPolicy.TLS_1_2,
      }
    );

    new apigateway.BasePathMapping(this, 'LinkedupWebApiBasePathMapping', {
      domainName: domain,
      restApi: api,
      basePath: '', // leave empty for root
    });

    new s3.Bucket(this, 'JrVentureMediaUploadBucket', {
      bucketName: 'jr-venture-media-upload-bucket',
      lifecycleRules: [
        {
          expiration: Duration.days(1),
          enabled: true,
        },
      ],
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY, // For dev/test only
      autoDeleteObjects: true, // Needs permissions for destroy
      cors: [
        {
          allowedMethods: [
            HttpMethods.PUT,
            HttpMethods.POST,
            HttpMethods.GET,
            HttpMethods.DELETE,
            HttpMethods.HEAD,
          ],
          allowedOrigins: ['http://localhost:3000', process.env.CORS_ORIGIN!],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag'],
        },
      ],
    });
  }
}
