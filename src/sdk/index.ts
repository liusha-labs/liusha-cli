import axios from 'axios';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';

const baseURL = 'https://dev-api-liusha-com.onebitbank.workers.dev';
function extractSessionToken(setCookieHeader: string[]): string | null {
  for (const cookie of setCookieHeader) {
    if (cookie.includes('__Secure-better-auth.session_token=')) {
      const match = cookie.match(/__Secure-better-auth\.session_token=([^;]+)/);
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

async function readTokenFromFile(): Promise<string | null> {
  try {
    const homeDir = os.homedir();
    const tokenFilePath = path.join(homeDir, '.liusha');
    const token = await fs.readFile(tokenFilePath, 'utf8');
    return token.trim();
  } catch (error) {
    return null;
  }
}

export async function signup(email: string, password: string) {
  
  const res = await axios.post(`${baseURL}/api/auth/sign-up/email`, {
    name: 'lanmao',
    email: email,
    password: password,
    callbackURL: 'https://dev.app-liusha-com.pages.dev/dashboard'
  });
  
  if (res.status === 200) {
    return { success: true };
  } else {
    return { success: false, message: res.data.message };
  }
}

export async function signin(email: string, password: string) {

  const res = await axios.post(`${baseURL}/api/auth/sign-in/email`, {
    email: email,
    password: password,
  });
  
  if (res.status === 200) {
    if (res.headers['set-cookie']) {
      const sessionToken = extractSessionToken(res.headers['set-cookie']);
      if (sessionToken) {
        await saveTokenToFile(sessionToken);
        console.log('Session token saved to ~/.liusha');
      }
    }
    return { success: true };
  } else {
    return { success: false, message: res.data.message };
  }
}

export async function orders() {
  const sessionToken = await readTokenFromFile();
  
  if (!sessionToken) {
    throw new Error('No session token found. Please login first.');
  }
  
  const res = await axios.get(`${baseURL}/api/v1/orders/list`, {
    headers: {
      'Cookie': `__Secure-better-auth.session_token=${sessionToken}`
    }
  });
  
  console.log(res.data);
}
