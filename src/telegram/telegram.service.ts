import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegrafOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegrafOptions;

	constructor(
		@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegrafOptions
	){
		this.bot = new Telegraf(options.token);
		this.options = options;
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}
