import { prop } from '@typegoose/typegoose';
import { Advantage, HhData, TopLevelCategory } from '../top-page.model';
import { IsArray, IsDefined, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class HhDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}
export class AdvantageDto {

	@IsString()
	title: string;

	@IsString()
	description: string;
}
export class CreateTopPageDto {

	// @prop({ enum: TopLevelCategory }
	@IsEnum(TopLevelCategory)
	@IsDefined()
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@ValidateNested()
	@Type(() => HhDataDto)
	@IsOptional()
	hh?: HhData;

	@IsArray()
	@ValidateNested()
	@Type(() => AdvantageDto)
	advantages: Advantage[];

	@IsString()
	seoText: string;

	@IsString()
	tagsTitle: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];
}

export class FindTopPageByCategoryDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}