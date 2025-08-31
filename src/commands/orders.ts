#!/usr/bin/env node
import { Command } from 'commander';
import { orders } from '../sdk/index.js';

const program = new Command();

program
  .description('get orders')
  .action(async () => {
    try {
      console.log(`get orders list...`);
      const res = await orders();
      console.log(res)
    } catch (error) {
      console.error('get orders failed:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);