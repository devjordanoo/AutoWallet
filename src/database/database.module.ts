import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepositories } from './repositories/users.repositories';
import { CategorieRepositories } from './repositories/categories.repositories';

@Global()
@Module({
	providers: [PrismaService, UsersRepositories, CategorieRepositories],
	exports: [UsersRepositories, CategorieRepositories],
})
export class DatabaseModule {}
