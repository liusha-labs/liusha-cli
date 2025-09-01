#!/usr/bin/env node
import { Command } from 'commander';
import { anonymous } from '../sdk/index.js';
import { readTokenFromFile } from '../sdk/index.js';

const program = new Command();

program
  .description('deploy website to liusha.dev')
  .action(async () => {
    try {
      // if cookie not exists then sigin with anonymous
      const token = await readTokenFromFile();
      if (!token) {
        const res = await anonymous();
        console.log(res)
      }
      // upload files to cloudflare workers
    } catch (error) {
      console.error('signin failed:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);