#!/usr/bin/env node
import { Command } from 'commander';
import { signout } from '../sdk/index.js';
import { analytics } from '../utils/analytics.js';

const program = new Command();

program
  .description('signout liusha.com')
  .action(async () => {
    analytics.trackCommand('signout');
    console.log(`signout ...`);
    const res = await signout();
    console.log(`signout success: ${res}`)
  });

program.parse(process.argv);