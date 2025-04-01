import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepositories } from 'src/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
	constructor(private readonly bankAccountsRepo: BankAccountRepositories) {}

	async validate(userId: string, bankAccountId: string) {
		const isOwner = await this.bankAccountsRepo.findOne({
			where: { id: bankAccountId, userId },
		});

		if (!isOwner) {
			throw new NotFoundException('Bank  Account not found');
		}
	}
}
