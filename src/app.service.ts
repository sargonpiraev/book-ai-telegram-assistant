import { Injectable, Logger } from '@nestjs/common';
import { UnstructuredService } from './unstructured.service';
import { ChromaService } from './chroma.service';
import { OpenAIService } from './openai.service';
import { BookService } from './book.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger('AppService');

  constructor(
    private readonly unstructuredService: UnstructuredService,
    private readonly chromaService: ChromaService,
    private readonly openAIService: OpenAIService,
    private readonly bookService: BookService,
  ) {}

  async ingest() {
    this.logger.log('Fetching...');
    const bookText = await this.bookService.getBookText();
    this.logger.log('Chunking...');
    const chunks = await this.unstructuredService.getChunks(bookText);
    this.logger.log('Embedding...');
    const documents = chunks.map((chunk) => chunk.text);
    const embeddings = await this.openAIService.embedDocuments(documents);
    this.logger.log('Ingesting...');
    await this.chromaService.ingest(documents, embeddings);
  }

  async prompt(userPrompt: string): Promise<string> {
    this.logger.log('Embedding...');
    const vector = await this.openAIService.embedQuery(userPrompt);
    this.logger.log('Querying...');
    const result = await this.chromaService.query(vector);
    const documents = result.documents as unknown as string[];
    this.logger.log('Prompting...');
    const response = await this.openAIService.prompt(documents, userPrompt);
    return response.content as string;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
