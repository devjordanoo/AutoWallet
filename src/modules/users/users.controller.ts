import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ActiveUserId } from 'src/utils/decorators/activeUserId';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/me')
	async detail(@ActiveUserId() userId: string) {
		return await this.usersService.getUserById(userId);
	}
}
