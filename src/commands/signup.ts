#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import { signup } from '../sdk/index.js';
import { analytics } from '../utils/analytics.js';

const program = new Command();

program
  .description('signup account on liusha.com')
  .action(async () => {
    analytics.trackCommand('signup');
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

    console.log(`signuping with email ${response.email} ...`);
    const res = await signup(response.email, response.password);
    console.log(`signin before you deploy your website`);
  });

program.parse(process.argv);