#!/usr/bin/env node
import { Command } from 'commander';
import { anonymous, project, readSignupedFile, readTokenFromFile } from '../sdk/index.js';

const program = new Command();

program
  .description('deploy website to liusha.dev')
  .action(async () => {
    const signuped = await readSignupedFile();
    if (signuped) {
      const token = await readTokenFromFile();
      if (!token) {
        console.log('You already signup an account, please signin first')
      } else {
        const res = await project('leo project', 'leo.liusha.dev', 'apkfreedown.com');
        console.log(res)
      }
    } else {
      const token = await readTokenFromFile();
      if (!token) {
        await anonymous()
      }
      const res = await project('leo project', 'leo.liusha.dev', 'apkfreedown.com');
      console.log(res)
    }
  });

program.parse(process.argv);