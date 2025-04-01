import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TransactionsRepositories {
	constructor(private readonly prismaService: PrismaService) {}
	create(findManyDto: Prisma.TransactionCreateArgs) {
		return this.prismaService.transaction.create(findManyDto);
	}

	findMany(findManyDto: Prisma.TransactionFindManyArgs) {
		return this.prismaService.transaction.findMany(findManyDto);
	}

	findOne(findOneDto: Prisma.TransactionFindUniqueArgs) {
		return this.prismaService.transaction.findUnique(findOneDto);
	}

	findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
		return this.prismaService.transaction.findFirst(findFirstDto);
	}

	update(updateDto: Prisma.TransactionUpdateArgs) {
		return this.prismaService.transaction.update(updateDto);
	}

	delete(deleteDto: Prisma.TransactionDeleteArgs) {
		return this.prismaService.transaction.delete(deleteDto);
	}
}
