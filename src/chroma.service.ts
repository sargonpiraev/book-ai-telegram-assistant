import { ChromaClient, CloudClient, Collection, EmbeddingFunction } from 'chromadb';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Custom empty embedding function to avoid loading default dependencies
class NoOpEmbeddingFunction implements EmbeddingFunction {
  generate(texts: string[]): Promise<number[][]> {
    // Return empty embeddings - we provide our own via OpenAI
    return Promise.resolve(texts.map(() => []));
  }
}

@Injectable()
export class ChromaService implements OnModuleInit {
  private readonly client: ChromaClient | CloudClient;
  private collection: Collection;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('CHROMADB_API_KEY');
    const tenant = this.configService.get<string>('CHROMADB_TENANT')!;
    const database = this.configService.get<string>('CHROMADB_DATABASE')!;
    if (apiKey) {
      this.client = new CloudClient({ tenant, database, apiKey });
    } else {
      const url = this.configService.get<string>('CHROMADB_URL')!;
      const { hostname: host, port } = new URL(url);
      this.client = new ChromaClient({
        host,
        port: Number(port),
        tenant,
        database,
      });
    }
  }

  async onModuleInit() {
    await this.client.countCollections();
    const collectionName = this.configService.get<string>('CHROMADB_COLLECTION')!;
    this.collection = await this.client.getOrCreateCollection({
      name: collectionName,
      // Use custom no-op embedding function to avoid loading heavy dependencies
      embeddingFunction: new NoOpEmbeddingFunction(),
    });
  }

  async ingest(documents: string[], embeddings: number[][]) {
    const ids = documents.map((_, index) => index.toString());
    return this.collection.add({ ids, embeddings, documents });
  }

  async query(vector: number[]) {
    return this.collection.query({ queryEmbeddings: [vector], nResults: 5 });
  }
}
