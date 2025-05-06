#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import * as cdk from 'aws-cdk-lib';
import { LinkedupWebApiStack } from '../lib/linkedup-web-api-stack';

const app = new cdk.App();
new LinkedupWebApiStack(app, 'LinkedupWebApiStack');
