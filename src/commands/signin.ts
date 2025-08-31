#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import { signin } from '../sdk/index.js';

const program = new Command();

program
  .description('signin liusha.com')
  .action(async () => {
    try {
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
    } catch (error) {
      console.error('signin failed:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);