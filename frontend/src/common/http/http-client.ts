import axios, { AxiosInstance } from 'axios';
import { requestAuthorization } from './request-interceptors';

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BARCABINET_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(requestAuthorization);
export { httpClient };
