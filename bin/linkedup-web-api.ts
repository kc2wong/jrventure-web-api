#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import * as cdk from 'aws-cdk-lib';
import { LinkedupWebApiGatewayStack } from '../lib/linkedup-web-api-stack';
import { LinkedupWebApiCertificateStack } from '../lib/linkedup-web-api-certificate-stack';

const app = new cdk.App();
const certStack = new LinkedupWebApiCertificateStack(
  app,
  'LinkedupWebApiCertificateStack',
  {
    env: {
      region: 'us-east-1',
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
    // domainNames: ['*.kelvin-wong.cloud', 'kelvin-wong.cloud'], // Pass the domain names to the certificate stack
    domainNames: 'webapi.kelvin-wong.cloud', // Pass the domain names to the certificate stack
  }
);

new LinkedupWebApiGatewayStack(app, 'LinkedupWebApiGatewayStack', {
  env: {
    // region: 'us-east-1',
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  domainName: 'webapi.kelvin-wong.cloud',
  certificate: certStack.webApiCert, // Use the certificate from the certificate stack
});
