import { AppModule } from './app.module';
import { IngestCommand } from './ingest.command';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppModule],
  providers: [IngestCommand],
})
export class CliModule {}
