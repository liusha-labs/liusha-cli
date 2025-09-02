#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('liusha')
  .description('liusha cli tools')
  .version('0.0.1');

program
  .command('deploy', 'deploy static website', { executableFile: './commands/deploy.js' });

program
  .command('signup', 'signup with email and password', { executableFile: './commands/signup.js' });

program
  .command('signin', 'signin with email and password', { executableFile: './commands/signin.js' });

program
  .command('signout', 'signout from liusha.com', { executableFile: './commands/signout.js' });

program
  .command('orders', 'get orders list', { executableFile: './commands/orders.js' });

program.parse(process.argv);
