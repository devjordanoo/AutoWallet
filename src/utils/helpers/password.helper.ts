import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class PasswordHelper {
	private readonly saltRounds = 12;
	async crypt(password: string) {
		return await hash(password, this.saltRounds);
	}

	async compare(s: string, hash: string) {
		return await compare(s, hash);
	}
}
