import { createClient } from '@hey-api/client-axios';

export const defaultClient = createClient({
  // set default base url for requests made by this client
  baseURL: process.env.BACKEND_API_URL,
  /**
   * Set default headers only for requests made by this client. This is to
   * demonstrate local clients and their configuration taking precedence over
   * global configuration.
   */
  // headers: {
  //   Authorization: 'Bearer <token_from_local_client>',
  // },
});

