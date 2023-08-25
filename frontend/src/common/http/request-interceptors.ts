import type { InternalAxiosRequestConfig } from 'axios';
import { assoc } from 'ramda';

export const requestAuthorization = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('access_token');
  config.headers = assoc('Authorization', `Bearer ${token}`, config.headers);
  return config;
};
