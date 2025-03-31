import { Injectable } from '@nestjs/common';
import { UsersRepositories } from 'src/database/repositories/users.repositories';

@Injectable()
export class UsersService {
	constructor(private readonly userRepo: UsersRepositories) {}
}
