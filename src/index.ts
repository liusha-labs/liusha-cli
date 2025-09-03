#!/usr/bin/env node

// Check Node.js version before importing anything else
import { checkNodeVersion } from './utils/version-check.js';
checkNodeVersion();

import { Command } from 'commander';

const program = new Command();

program
  .name('liusha')
  .description('liusha cli tools')
  .version('0.0.1')
  .command('deploy', 'deploy static website', { executableFile: './commands/deploy.js' })
  .command('signup', 'signup with email and password', { executableFile: './commands/signup.js' })
  .command('signin', 'signin with email and password', { executableFile: './commands/signin.js' })
  .command('signout', 'signout from liusha.com', { executableFile: './commands/signout.js' })

program.parse(process.argv);
