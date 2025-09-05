#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

async function main() {
  await CommandFactory.run(CliModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
}

main().catch(console.error);
