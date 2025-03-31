import { Injectable } from '@nestjs/common';
import { UsersRepositories } from 'src/database/repositories/users.repositories';

@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepositories) {}

	async getUserById(userId: string) {
		return await this.userRepo.findUnique({
			where: { id: userId },
			select: { name: true, email: true },
		});
	}
}
