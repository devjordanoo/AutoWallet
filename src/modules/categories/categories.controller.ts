import { Controller, Get } from '@nestjs/common';
import { ActiveUserId } from 'src/utils/decorators/activeUserId';
import { CategoriesService } from './services/categories.service';
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	findAll(@ActiveUserId() userId: string) {
		return this.categoriesService.findAllByUserId(userId);
	}
}
