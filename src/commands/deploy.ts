#!/usr/bin/env node
import { Command } from 'commander';
import { anonymous, project, readSignupedFile, readTokenFromFile } from '../sdk/index.js';
import { analytics } from '../utils/analytics.js';

const program = new Command();

async function _deploy(projectName: string, domain: string, customDomain: string) {
  const res = await project(projectName, domain, customDomain);
  return res;
}

program
  .argument('<path>', 'path to upload')
  .argument('<domain>', 'domain to use')
  .description('deploy website to liusha.dev')
  .action(async (path, domain) => {
    analytics.trackCommand('deploy');
    const signuped = await readSignupedFile();
    if (signuped) {
      const token = await readTokenFromFile();
      if (!token) {
        console.log('You already signup an account, please signin first')
      } else {
        const res = await _deploy('leo project', 'leo.liusha.dev', 'apkfreedown.com');
        console.log(res)
      }
    } else {
      const token = await readTokenFromFile();
      if (!token) {
        await anonymous()
      }
      const res = await _deploy('leo project', 'leo.liusha.dev', 'apkfreedown.com')
      console.log(res)
    }
  });

program.parse(process.argv);