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
	Query,
	ParseIntPipe,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/utils/decorators/activeUserId';
import { TransactionsService } from './services/transactions.service';
import { OptionalParseUUIDPipe } from 'src/utils/pipes/optionalParseUUID.pipe';
import { TransactionType } from 'src/utils/enums/transactionType.enum';
import { OptionalParseEnumPipe } from 'src/utils/pipes/optionalParseEnum.pipe';

@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Post()
	create(
		@ActiveUserId() userId: string,
		@Body() createTransactionDto: CreateTransactionDto,
	) {
		return this.transactionsService.create(userId, createTransactionDto);
	}

	@Get()
	findAll(
		@ActiveUserId() userId: string,
		@Query('month', ParseIntPipe) month: number,
		@Query('year', ParseIntPipe) year: number,
		@Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string,
		@Query('type', new OptionalParseEnumPipe(TransactionType))
		type?: TransactionType,
	) {
		return this.transactionsService.findAllByUserId(userId, {
			month,
			year,
			bankAccountId,
			type,
		});
	}

	@Put(':id')
	update(
		@ActiveUserId() userId: string,
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionsService.update(userId, id, updateTransactionDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(
		@ActiveUserId() userId: string,
		@Param('id', ParseUUIDPipe) id: string,
	) {
		await this.transactionsService.remove(userId, id);
		return null;
	}
}
