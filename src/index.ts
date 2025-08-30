#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('liusha')
  .description('liusha cli tools')
  .version('0.0.1');

program
  .command('hello', 'print hello command', { executableFile: './commands/hello.js' });

program
  .command('world', 'print world command', { executableFile: './commands/world.js' });

program.parse(process.argv);