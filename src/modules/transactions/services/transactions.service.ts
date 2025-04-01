import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepositories } from 'src/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionType } from 'src/utils/enums/transactionType.enum';

@Injectable()
export class TransactionsService {
	constructor(
		private readonly transactionsRepo: TransactionsRepositories,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
		private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
		private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
	) {}

	async create(userId: string, createTransactionDto: CreateTransactionDto) {
		const { bankAccountId, categoryId, date, name, type, value } =
			createTransactionDto;

		await this.validateEntitiesOwnership({
			userId,
			bankAccountId,
			categoryId,
		});

		return this.transactionsRepo.create({
			data: {
				userId,
				bankAccountId,
				categoryId,
				date,
				name,
				type,
				value,
			},
		});
	}

	findAllByUserId(
		userId: string,
		filters: {
			month: number;
			year: number;
			bankAccountId?: string;
			type?: TransactionType;
		},
	) {
		return this.transactionsRepo.findMany({
			where: {
				userId,
				bankAccountId: filters.bankAccountId,
				type: filters.type,
				date: {
					gte: new Date(Date.UTC(filters.year, filters.month)),
					lte: new Date(Date.UTC(filters.year, filters.month + 1)),
				},
			},
		});
	}

	async update(
		userId: string,
		transactionId: string,
		updateTransactionDto: UpdateTransactionDto,
	) {
		const { bankAccountId, categoryId, date, name, type, value } =
			updateTransactionDto;

		await this.validateEntitiesOwnership({
			userId,
			bankAccountId,
			categoryId,
		});

		return this.transactionsRepo.update({
			where: { id: transactionId, userId },
			data: {
				bankAccountId,
				categoryId,
				date,
				name,
				type,
				value,
			},
		});
	}

	async remove(userId: string, transactionId: string) {
		await this.validateEntitiesOwnership({ userId, transactionId });

		return this.transactionsRepo.delete({
			where: { id: transactionId, userId },
		});
	}

	private async validateEntitiesOwnership(params: {
		userId: string;
		bankAccountId?: string;
		categoryId?: string;
		transactionId?: string;
	}) {
		const { bankAccountId, categoryId, userId, transactionId } = params;

		await Promise.all([
			bankAccountId &&
				this.validateBankAccountOwnershipService.validate(
					userId,
					bankAccountId,
				),

			categoryId &&
				this.validateCategoryOwnershipService.validate(userId, categoryId),

			transactionId &&
				this.validateTransactionOwnershipService.validate(
					userId,
					transactionId,
				),
		]);
	}
}
