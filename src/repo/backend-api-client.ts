import { BackendApiClient } from '../__generated__/linkedup-backend-client';

// Create the client instance with server and authentication details
const backendApiClient = new BackendApiClient({
  // BASE: 'https://sad6ntmjsh.execute-api.eu-west-2.amazonaws.com/prod',
  BASE: process.env.BACKEND_API_URL,
});

export { backendApiClient };
