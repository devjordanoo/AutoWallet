import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class CategorieRepositories {
	constructor(private readonly prismaService: PrismaService) {}
	findMany(findManyDto: Prisma.CategoryFindManyArgs) {
		return this.prismaService.category.findMany(findManyDto);
	}
}
