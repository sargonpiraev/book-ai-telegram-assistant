import { Ctx, On, Start, Update, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { AppService } from './app.service';

@Update()
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply('Hello, world!');
  }

  @On('text')
  async onText(@Message('text') text: string, @Ctx() ctx: Context) {
    console.log(text);
    const result = await this.appService.prompt(text);
    await ctx.reply(result);
  }
}
