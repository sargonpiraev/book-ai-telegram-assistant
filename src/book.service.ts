import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookService {
  constructor(private readonly configService: ConfigService) {}

  async getBookText() {
    const bookUrl = this.configService.get<string>('BOOK_URL')!;
    const response = await fetch(bookUrl);
    return response.text();
  }
}
