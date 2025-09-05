import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChromaService } from './chroma.service';
import { configModule } from './config.module';
import { AppGateway } from './app.gateway';
import { UnstructuredService } from './unstructured.service';
import { telegramModule } from './telegram.module';
import { OpenAIService } from './openai.service';
import { BookService } from './book.service';

@Module({
  imports: [configModule, telegramModule],
  controllers: [AppController],
  exports: [AppService],
  providers: [
    AppService,
    ChromaService,
    AppGateway,
    UnstructuredService,
    OpenAIService,
    BookService,
  ],
})
export class AppModule {}
