#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('liusha')
  .description('liusha cli tools')
  .version('0.0.1');

program
  .command('signup', 'signup with email and password', { executableFile: './commands/signup.js' });

program
  .command('signin', 'signin with email and password', { executableFile: './commands/signin.js' });

program
  .command('orders', 'get orders list', { executableFile: './commands/orders.js' });

program.parse(process.argv);
