import { ModuleMetadata } from '@nestjs/common';

export interface ITelegrafOptions {
	chatId: string;
	token: string;
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'>{
	// tslint:disable-next-line:no-any
	useFactory: (...args: any[]) => Promise<ITelegrafOptions> | ITelegrafOptions;
	// tslint:disable-next-line:no-any
	inject? : any[];
}