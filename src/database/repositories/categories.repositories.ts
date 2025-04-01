import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CategoriesRepositories {
	constructor(private readonly prismaService: PrismaService) {}
	findMany(findManyDto: Prisma.CategoryFindManyArgs) {
		return this.prismaService.category.findMany(findManyDto);
	}

	findOne(findOneDto: Prisma.CategoryFindUniqueArgs) {
		return this.prismaService.category.findUnique(findOneDto);
	}
}
