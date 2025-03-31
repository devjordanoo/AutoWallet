import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { UtilsModule } from './utils/utils.module';

@Module({
	imports: [UsersModule, DatabaseModule, UtilsModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
