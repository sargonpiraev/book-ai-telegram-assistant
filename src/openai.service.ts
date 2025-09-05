import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { pull } from 'langchain/hub';
import { ChatPromptTemplate } from '@langchain/core/prompts';

export class OpenAIService {
  private readonly embedder: OpenAIEmbeddings;
  private readonly chatOpenAI: ChatOpenAI;
  
  constructor() {
    this.chatOpenAI = new ChatOpenAI({ model: 'gpt-4o-mini' });
    this.embedder = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
  }

  embedDocuments(documents: string[]) {
    return this.embedder.embedDocuments(documents);
  }

  embedQuery(query: string) {
    return this.embedder.embedQuery(query);
  }

  async prompt(documents: string[], question: string) {
    const promptTemplate = await pull<ChatPromptTemplate>('rlm/rag-prompt');
    const messages = await promptTemplate.invoke({ context: documents, question });
    const response = await this.chatOpenAI.invoke(messages);
    return response;
  }
}
