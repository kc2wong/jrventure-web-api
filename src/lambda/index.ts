import '../util/tracing'; // must be first import

import serverlessExpress from '@vendia/serverless-express';

import { logger } from '@util/logging-util';

import app from '../app';
import { flush } from '../util/tracing';


const lambdaHandler = serverlessExpress({ app });

export const handler = (event: any, context: any, callback: any) => {
  lambdaHandler(event, context, async (error: any, response: any) => {
    try {
      await flush();
      logger.info('OpenTelemetry spans flushed successfully');
    } catch (err) {
      logger.error(
        `Error flushing OpenTelemetry spans: ${JSON.stringify(err)}`
      );
    } finally {
      callback(error, response);
    }
  });
};