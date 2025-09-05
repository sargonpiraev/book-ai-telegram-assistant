import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { UnstructuredClient } from 'unstructured-client';
import { Strategy } from 'unstructured-client/sdk/models/shared';

type Chunk = {
  element_id: string;
  type: 'CompositeElement';
  text: string;
  metadata: {
    orig_elements: string;
    is_continuation: boolean;
    languages: string[];
    filename: string;
    filetype: string;
  },
};

@Injectable()
export class UnstructuredService {
  private readonly client: UnstructuredClient;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('UNSTRUCTURED_API_KEY')!;
    this.client = new UnstructuredClient({
      security: { apiKeyAuth: apiKey },
      // debugLogger: console,
    });
  }

  getChunks(bookText: string): Promise<Chunk[]> {
    return this.client.general.partition({
      partitionParameters: {
        strategy: Strategy.HiRes,
        files: { content: new Blob([bookText]), fileName: 'hobbit.txt' },
        chunkingStrategy: 'basic',
      },
    }) as Promise<Chunk[]>;
  }
}
