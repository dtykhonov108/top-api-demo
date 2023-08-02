import { ConfigService } from '@nestjs/config';
import { ITelegrafOptions } from '../telegram/telegram.interface';

export const getTelegrafConfig =  (configService: ConfigService): ITelegrafOptions => {
	const token = configService.get('TELEGRAM_TOKEN');
	if(!token){
		throw new Error(' TELEGRAM_TOKEN not found');
	}
	return {
		token,
		chatId: configService.get('CHAT_ID') ?? ''
	};
};