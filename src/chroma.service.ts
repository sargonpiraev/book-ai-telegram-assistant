import { ChromaClient, Collection } from 'chromadb';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChromaService implements OnModuleInit {
  private readonly client: ChromaClient;
  private collection: Collection;

  constructor(private readonly configService: ConfigService) {
    const chromadbUrlEnv = this.configService.get<string>('CHROMADB_URL')!;
    const tenant = this.configService.get<string>('CHROMADB_TENANT')!;
    const database = this.configService.get<string>('CHROMADB_DATABASE')!;
    const { hostname: host, port } = new URL(chromadbUrlEnv);
    this.client = new ChromaClient({
      host,
      port: Number(port),
      tenant,
      database,
    });
  }

  async onModuleInit() {
    await this.client.countCollections();
    const collectionName = this.configService.get<string>('CHROMADB_COLLECTION')!;
    this.collection = await this.client.getOrCreateCollection({ name: collectionName });
  }

  async ingest(documents: string[], embeddings: number[][]) {
    const ids = documents.map((_, index) => index.toString());
    await this.collection.add({ ids, embeddings, documents });
  }

  query(queryEmbedding: number[]) {
    return this.collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: 5,
    });
  }
}
