import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class PasswordHelper {
	private readonly saltRounds = 12;
	async crypt(password: string) {
		return await hash(password, this.saltRounds);
	}
}
