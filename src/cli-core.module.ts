import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ChromaService } from './chroma.service';
import { configModule } from './config.module';
import { UnstructuredService } from './unstructured.service';
import { OpenAIService } from './openai.service';
import { BookService } from './book.service';

@Module({
  imports: [configModule],
  providers: [AppService, ChromaService, UnstructuredService, OpenAIService, BookService],
  exports: [AppService],
})
export class CliCoreModule {}
