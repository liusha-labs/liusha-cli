#!/usr/bin/env node
import { checkNodeVersion } from '../utils/version-check.js';
checkNodeVersion();

import { Command } from 'commander';
import prompts from 'prompts';
import { signup } from '../sdk/index.js';

const program = new Command();

program
  .description('signup account on liusha.com')
  .action(async () => {
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
    console.log(res);
    console.log(`signin before you deploy your website`);
  });

program.parse(process.argv);