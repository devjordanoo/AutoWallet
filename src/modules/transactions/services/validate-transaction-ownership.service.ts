import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepositories } from 'src/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
	constructor(private readonly transactionRepo: TransactionsRepositories) {}

	async validate(userId: string, categoryId: string) {
		const isOwner = await this.transactionRepo.findOne({
			where: { id: categoryId, userId },
		});

		if (!isOwner) {
			throw new NotFoundException('Transaction not found');
		}
	}
}
