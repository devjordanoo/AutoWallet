import { Injectable } from '@nestjs/common';
import { CategoriesRepositories } from 'src/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
	constructor(private readonly categoriesRepo: CategoriesRepositories) {}

	findAllByUserId(userId: string) {
		return this.categoriesRepo.findMany({ where: { userId } });
	}
}
