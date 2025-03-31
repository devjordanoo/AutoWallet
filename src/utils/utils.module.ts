import { Global, Module } from '@nestjs/common';
import { PasswordHelper } from './helpers/password.helper';

@Global()
@Module({
	providers: [PasswordHelper],
	exports: [PasswordHelper],
})
export class UtilsModule {}
