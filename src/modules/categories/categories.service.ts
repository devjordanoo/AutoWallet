import { Injectable } from '@nestjs/common';
import { CategorieRepositories } from 'src/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
	constructor(private readonly categoriesRepo: CategorieRepositories) {}

	findAllByUserId(userId: string) {
		return this.categoriesRepo.findMany({ where: { userId } });
	}
}
