#!/usr/bin/env node
import { Command } from 'commander';
import { signout } from '../sdk/index.js';

const program = new Command();

program
  .description('signout liusha.com')
  .action(async () => {
    console.log(`signout ...`);
    const res = await signout();
    console.log(`signout success: ${res}`)
  });

program.parse(process.argv);