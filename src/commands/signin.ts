#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import { signin } from '../sdk/index.js';
import { analytics } from '../utils/analytics.js';

const program = new Command();

program
  .description('signin liusha.com')
  .action(async () => {
    analytics.trackCommand('signin');
    const response = await prompts([
      {
        type: 'text',
        name: 'email',
        message: 'Email:'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:'
      }
    ]);

    if (!response.email || !response.password) {
      console.log('signin cancelled');
      process.exit(1);
    }

    console.log(`signining with email ${response.email} ...`);
    const res = await signin(response.email, response.password);
    console.log(res)
  });

program.parse(process.argv);