import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const configModule = ConfigModule.forRoot({
  validationSchema: Joi.object({
    OPENAI_API_KEY: Joi.string().required(),
    TELEGRAM_BOT_TOKEN: Joi.string().required(),
    CHROMADB_URL: Joi.string().required(),
    CHROMADB_TENANT: Joi.string().required(),
    CHROMADB_DATABASE: Joi.string().required(),
    CHROMADB_COLLECTION: Joi.string().required(),
    UNSTRUCTURED_API_KEY: Joi.string().required(),
    BOOK_URL: Joi.string().required(),
    PORT: Joi.number().required(),
  }),
});
