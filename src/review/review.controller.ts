import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { CreateReviewDto } from './dto/dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwTAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto){
		return this.reviewService.create(dto);
	}

	@UseGuards(JwTAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string){
		const deletedDoc = await this.reviewService.delete(id);
		if(!deletedDoc){
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwTAuthGuard)
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string, @UserEmail() email: string){
		console.log(email);
		return this.reviewService.findByProductId(productId);
	}

	@Delete('byProduct/:productId')
	async deleteByProductId(@Param('productId', IdValidationPipe) productId: string){
		return this.reviewService.deleteByProductId(productId);
	}
}
