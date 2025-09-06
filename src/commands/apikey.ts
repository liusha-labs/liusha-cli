#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { apikeyCreate, apikeyList } from '../sdk/index.js';
import { analytics } from '../utils/analytics.js';

const program = new Command();

program
  .command('create')
  .argument('<name>', 'api key name')
  .description('create api key')
  .action(async (name) => {
    analytics.trackCommand('apikey_create');
    const res = await apikeyCreate(name);
    console.log(res)
  });

program
  .command('list')
  .description('list api keys')
  .action(async () => {
    analytics.trackCommand('apikey_list');
    const res = await apikeyList();
    console.log(res);
  });

program.parse(process.argv);