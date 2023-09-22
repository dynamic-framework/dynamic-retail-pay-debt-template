import axios, { AxiosError } from 'axios';
import { liquidParser } from '@dynamic-framework/ui-react';

import ApiError from './utils/ApiError';

import type { ApiErrorItem } from './api-interface';

const apiClient = axios.create({
  baseURL: liquidParser.parse('{{vars.api-path}}'),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && axios.isAxiosError<{ errors: Array<ApiErrorItem> }>(error)) {
      throw new ApiError(error.response.data.errors);
    }
    throw error;
  },
);

export default apiClient;
