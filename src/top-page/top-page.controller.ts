import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import {TopPageModel} from './top-page.model';
import {FindTopPageDto} from './dto/find-top-page.dto';
import { ProductService } from '../product/product.service';
import { TopPageService } from './top-page.service';
import { PRODUCT_NOT_FOUND_ERROR } from '../product/product.constants';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PAGE_NOT_FOUND_ERROR } from './top-page.contants';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { JwTAuthGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService) {}
	@UseGuards(JwTAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto){
		return this.topPageService.create(dto);
	}
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string){
		const page = await this.topPageService.findById(id);
		if(!page){
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
		return page;
	}
	@UseGuards(JwTAuthGuard)
	@Delete('id')
	async delete(@Param('id', IdValidationPipe) id: string){
		const deletedPage = await this.topPageService.deleteById(id);
		if(!deletedPage){
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
	}
	@UseGuards(JwTAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel){
		const updatedPage = await this.topPageService.updateById(id, dto);
		if(!updatedPage){
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR);
		}
		return updatedPage;
	}
	@HttpCode(200)
	@Post('find')
	async find(@Body() firstCategory: FindTopPageDto){
		return this.topPageService.findByCategory(firstCategory);

	}
	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string){
		return this.topPageService.findByText(text);

	}
}
