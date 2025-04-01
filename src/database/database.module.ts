import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepositories } from './repositories/users.repositories';
import { BankAccountRepositories } from './repositories/bank-accounts.repositories';
import { CategoriesRepositories } from './repositories/categories.repositories';
import { TransactionsRepositories } from './repositories/transactions.repositories';

@Global()
@Module({
	providers: [
		PrismaService,
		UsersRepositories,
		CategoriesRepositories,
		BankAccountRepositories,
		TransactionsRepositories,
	],
	exports: [
		UsersRepositories,
		CategoriesRepositories,
		BankAccountRepositories,
		TransactionsRepositories,
	],
})
export class DatabaseModule {}
