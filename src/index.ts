#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import pkgJson from "../package.json" with { type: "json" };
import { checkNodeVersion } from './utils/version-check.js';
import { updateCheck } from './utils/update-checker.js';
checkNodeVersion();

const program = new Command();

program
  .name('liusha')
  .description('liusha cli tools')
  .version('0.0.1')
  .command('deploy', 'deploy static website', { executableFile: './commands/deploy.js' })
  .command('signup', 'signup with email and password', { executableFile: './commands/signup.js' })
  .command('signin', 'signin with email and password', { executableFile: './commands/signin.js' })
  .command('signout', 'signout from liusha.com', { executableFile: './commands/signout.js' })
  .command('apikey', 'manage apikey from liusha.com', { executableFile: './commands/apikey.js' });

let text = ` ⛅️ liusha ${pkgJson.version} `
const maybeNewVersion = await updateCheck();
if (maybeNewVersion !== undefined) {
  text += ` (update available ${chalk.green(maybeNewVersion)})`;
  console.log(text);
}

program.parse(process.argv);
