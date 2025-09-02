#!/usr/bin/env node
import { Command } from 'commander';
import { orders } from '../sdk/index.js';

const program = new Command();

program
  .description('get orders')
  .action(async () => {
    console.log(`get orders list...`);
    const res = await orders();
    console.log(res)
  });

program.parse(process.argv);