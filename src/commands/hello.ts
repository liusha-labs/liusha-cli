#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .argument('[name]', '名字')
  .action((name) => {
    console.log(`Hello ${name || 'World'}!`);
  });

program.parse(process.argv);