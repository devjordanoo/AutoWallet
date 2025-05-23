import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	ParseUUIDPipe,
	HttpCode,
	HttpStatus,
} from '@nestjs/common';

import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/utils/decorators/activeUserId';
import { BankAccountsService } from './services/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
	constructor(private readonly bankAccountsService: BankAccountsService) {}

	@Post()
	create(
		@ActiveUserId() userId: string,
		@Body() createBankAccountDto: CreateBankAccountDto,
	) {
		return this.bankAccountsService.create(userId, createBankAccountDto);
	}

	@Get()
	findAll(@ActiveUserId() userId: string) {
		return this.bankAccountsService.findAllByUserId(userId);
	}

	@Get(':id')
	findOne(@ActiveUserId() userId: string, @Param('id') id: string) {
		return this.bankAccountsService.findOne(userId, id);
	}

	@Put(':id')
	update(
		@ActiveUserId() userId: string,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateBankAccountDto: UpdateBankAccountDto,
	) {
		return this.bankAccountsService.update(userId, id, updateBankAccountDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(
		@ActiveUserId() userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		return this.bankAccountsService.remove(userId, id);
	}
}
