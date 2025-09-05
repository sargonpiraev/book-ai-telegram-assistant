import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { configModule } from './config.module';

export const telegramModule = TelegrafModule.forRootAsync({
  imports: [configModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({ token: configService.get<string>('TELEGRAM_BOT_TOKEN')! }),
});
