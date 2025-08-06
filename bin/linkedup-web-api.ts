#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import * as cdk from 'aws-cdk-lib';
import { LinkedupWebApiGatewayStack } from '../lib/linkedup-web-api-stack';

const app = new cdk.App();

new LinkedupWebApiGatewayStack(app, 'LinkedupWebApiGatewayStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
