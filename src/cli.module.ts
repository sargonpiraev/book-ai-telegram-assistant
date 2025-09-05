import { CliCoreModule } from './cli-core.module';
import { IngestCommand } from './ingest.command';
import { Module } from '@nestjs/common';

@Module({
  imports: [CliCoreModule],
  providers: [IngestCommand],
})
export class CliModule {}
