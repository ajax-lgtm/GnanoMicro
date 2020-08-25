import * as config from '@/config';
import axios from 'axios';

export interface SeverMessage {
  error_code: number;
  msg: string;
  request: string;
}

export const conduitApi = axios.create({
  baseURL: config.apiBaseUrl,
});
