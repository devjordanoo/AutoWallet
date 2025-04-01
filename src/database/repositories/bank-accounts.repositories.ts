import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountRepositories {
	constructor(private readonly prismaService: PrismaService) {}
	create(findManyDto: Prisma.BankAccountCreateArgs) {
		return this.prismaService.bankAccount.create(findManyDto);
	}

	findMany<T extends Prisma.BankAccountFindManyArgs>(
		findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>,
	) {
		return this.prismaService.bankAccount.findMany(findManyDto);
	}

	findOne(findOneDto: Prisma.BankAccountFindUniqueArgs) {
		return this.prismaService.bankAccount.findUnique(findOneDto);
	}

	findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
		return this.prismaService.bankAccount.findFirst(findFirstDto);
	}

	update(updateDto: Prisma.BankAccountUpdateArgs) {
		return this.prismaService.bankAccount.update(updateDto);
	}

	delete(deleteDto: Prisma.BankAccountDeleteArgs) {
		return this.prismaService.bankAccount.delete(deleteDto);
	}
}
