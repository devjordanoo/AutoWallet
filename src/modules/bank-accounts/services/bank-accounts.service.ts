import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountRepositories } from 'src/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';
import { TransactionType } from 'src/utils/enums/transactionType.enum';

@Injectable()
export class BankAccountsService {
	constructor(
		private readonly bankAccountsRepo: BankAccountRepositories,
		private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
	) {}

	create(userId: string, createBankAccountDto: CreateBankAccountDto) {
		const { name, initialBalance, type, color } = createBankAccountDto;

		return this.bankAccountsRepo.create({
			data: {
				name,
				initialBalance,
				type,
				color,
				userId,
			},
		});
	}

	async findAllByUserId(userId: string) {
		const bankAccounts = await this.bankAccountsRepo.findMany({
			where: { userId },
			include: {
				transactions: {
					select: { value: true, type: true },
				},
			},
		});

		return bankAccounts.map(({ transactions, ...bankAcc }) => {
			const currentBalance = transactions.reduce(
				(acc, transaction) =>
					acc +
					(transaction.type === TransactionType.INCOME
						? transaction.value
						: -transaction.value),
				0,
			);

			return {
				currentBalance,
				...bankAcc,
			};
		});
	}

	findOne(userId: string, id: string) {
		return this.bankAccountsRepo.findOne({
			where: { id, userId },
		});
	}

	async update(
		userId: string,
		id: string,
		updateBankAccountDto: UpdateBankAccountDto,
	) {
		const { name, initialBalance, type, color } = updateBankAccountDto;
		await this.validateBankAccountOwnershipService.validate(userId, id);

		return this.bankAccountsRepo.update({
			where: { id, userId },
			data: {
				name,
				initialBalance,
				type,
				color,
			},
		});
	}

	async remove(userId: string, id: string) {
		await this.validateBankAccountOwnershipService.validate(userId, id);

		return this.bankAccountsRepo.delete({
			where: { id, userId },
		});
	}
}
