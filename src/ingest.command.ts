import { AppService } from './app.service';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'ingest' })
export class IngestCommand extends CommandRunner {
  constructor(private readonly appService: AppService) {
    super();
  }

  async run() {
    
    await this.appService.ingest();
  }
}
