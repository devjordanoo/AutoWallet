import {
	IsEnum,
	IsHexColor,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator';
import { BankAccountTypes } from 'src/utils/enums/bankAccountTypes.enum';

export class CreateBankAccountDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	initialBalance: number;

	@IsNotEmpty()
	@IsEnum(BankAccountTypes)
	type: BankAccountTypes;

	@IsString()
	@IsNotEmpty()
	@IsHexColor()
	color: string;
}
