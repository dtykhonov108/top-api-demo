import { InjectModel } from 'nestjs-typegoose';
import { TopPageModel } from './top-page.model';
import { Injectable, UseGuards } from '@nestjs/common';
import { CreateTopPageDto, FindTopPageByCategoryDto } from './dto/create-top-page.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwTAuthGuard } from '../auth/guards/jwt.guard';
@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {
	}
	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findAll(){
		return this.topPageModel.find({}).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}
	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, {new: true}).exec();
	}

	async findByCategory(firstCategory: FindTopPageByCategoryDto) {
		return this.topPageModel
			.aggregate()
			.match({firstCategory})
			.group({
				_id: {secondCategory: '$secondCategory'},
				pages: { $push: { alias: '$alias', title: '$title'} }
			})
			.exec();

		// 	.aggregate([
		// 	{
		// 		$match: {
		// 			firstCategory: firstCategory
		// 		}
		// 	},
		// 	{
		// 		$group: {
		// 			_id: {secondCategory: '$secondCategory'},
		// 			pages: { $push: { alias: '$alias', title: '$title'}}
		// 		}
		// 	}
		// ]).exec();
	}

	async findByText(text: string){
		return this.topPageModel.find({ $text: {$search: text, $caseSensitive: false}}).exec();
	}
}