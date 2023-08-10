import type { InternalAxiosRequestConfig } from 'axios';
import { assoc } from 'ramda';

export const requestAuthorizationInterceptorFactory =
  (token: string) =>
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers = assoc('Authorization', `Bearer ${token}`, config.headers);
    return config;
  };
