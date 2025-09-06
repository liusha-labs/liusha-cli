import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';

const APIKEY = process.env.LIUSHA_API_KEY;

const baseURL = 'https://dev-api-liusha-com.onebitbank.workers.dev';
// const baseURL = 'http://localhost:8787';
function extractSessionToken(setCookieHeader: string[]): string | null {
  for (const cookie of setCookieHeader) {
    if (cookie.includes('__Secure-liusha_token=')) {
      const match = cookie.match(/__Secure-liusha_token=([^;]+)/);
      return match?.[1] ?? null;
    }
  }
  return null;
}

async function saveTokenToFile(token: string): Promise<void> {
  const homeDir = os.homedir();
  const tokenFilePath = path.join(homeDir, '.liusha');
  await fs.writeFile(tokenFilePath, token, 'utf8');
}

export async function readTokenFromFile(): Promise<string | null> {
  try {
    const homeDir = os.homedir();
    const tokenFilePath = path.join(homeDir, '.liusha');
    const token = await fs.readFile(tokenFilePath, 'utf8');
    return token.trim();
  } catch (error) {
    return null;
  }
}

export async function readSignupedFile(): Promise<string | null> {
  try {
    const homeDir = os.homedir();
    const tokenFilePath = path.join(homeDir, '.signuped');
    const token = await fs.readFile(tokenFilePath, 'utf8');
    return token.trim();
  } catch (error) {
    return null;
  }
}

// Create optimized axios instance with interceptors
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL
  });

  // Request interceptor: Add token to Cookie header
  client.interceptors.request.use(
    async (config) => {
      if (APIKEY) {
        config.headers = config.headers || {};
        config.headers['x-api-key'] = APIKEY;
      } else {
        const token = await readTokenFromFile();
        if (token) {
          // Set cookie header
          config.headers = config.headers || {};
          config.headers.Cookie = `__Secure-liusha_token=${token}`;
        }
      }
       return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor: Save token from set-cookie header and handle errors
  client.interceptors.response.use(
    async (response) => {
      if (!APIKEY) {
        console.log(response.headers['set-cookie']);
        if (response.headers['set-cookie']) {
          const sessionToken = extractSessionToken(response.headers['set-cookie']);
          if (sessionToken) {
            await saveTokenToFile(sessionToken);
          }
        }
      }
      return response;
    },
    async (error) => {
      let message = '';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          // Handle different status codes
          switch (status) {
            case 400:
              message = `Bad Request:, ${data?.message || 'Invalid request parameters'}`
              break;
            case 401:
              message = `Unauthorized:, ${data?.message || 'Authentication required'}`;
              break;
            case 403:
              message = `Forbidden:, ${data?.message || 'Access denied'}`;
              break;
            case 404:
              message = `Not Found:, ${data?.message || 'Resource not found'}`;
              break;
            case 422:
              message = `Validation Error:, ${data?.message || 'Invalid input data'}`;
              break;
            case 500:
              message = `Server Error:, ${data?.message || 'Internal server error'}`;
              break;
            default:
              message = `API Error ${status}:, ${data?.message || data || 'Unknown error'}`;
          }
        } else if (error.request) {
          message = 'Network Error: No response received from server';
        } else {
          message = `Request Error:, ${error.message}`;
        }
      } else {
        message = `Unexpected Error:, ${error.message || error}`;
      }
      return { data: { message } };
    }
  );

  return client;
};

const apiClient = createApiClient();

export async function anonymous() {
  const res = await apiClient.post('/api/auth/sign-in/anonymous', {});
  return res.data;
}

export async function signup(email: string, password: string) {
  const res = await apiClient.post('/api/auth/sign-up/email', {
    name: 'lanmao',
    email: email,
    password: password,
    callbackURL: 'https://dev.app-liusha-com.pages.dev/dashboard'
  });
  if (res && res.data && res.data.message !== 'internal server error') {
    await fs.writeFile(path.join(os.homedir(), '.signuped'), '1', 'utf8');
  }
  return res.data;
}

export async function signin(email: string, password: string) {
  const res = await apiClient.post('/api/auth/sign-in/email', {
    email: email,
    password: password,
  });
  return res.data;
}

export async function signout() {
  const res = await apiClient.post('/api/auth/sign-out');
  await fs.unlink(path.join(os.homedir(), '.liusha'));
  return res.data;
}

export async function project(projectName: string, domain: string, customDomain: string) {
  const res = await apiClient.post('/api/v1/users/project', {
    projectName: projectName,
    domain: domain,
    customDomain: customDomain,
  });
  return res.data;
}

export async function apikeyCreate(name: string) {
  const res = await apiClient.post('/api/v1/users/apiKey', { name });
  return res.data;
}

export async function apikeyList() {
  const res = await apiClient.get('/api/v1/users/apiKeys');
  return res.data;
}