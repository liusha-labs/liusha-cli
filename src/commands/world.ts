#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();


program.action(() => {
  console.log('This is the world command.');
});

program.parse(process.argv);