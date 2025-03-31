import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHelper } from 'src/utils/helpers/password.helper';
import { Prisma } from '@prisma/client';
import { CategoriesTypes } from 'src/utils/enums/categoriesTypes.enum';
import { UsersRepositories } from 'src/database/repositories/users.repositories';

@Injectable()
export class UsersService {
	constructor(
		private readonly passwordHelper: PasswordHelper,
		private readonly userRepo: UsersRepositories,
	) {}

	private _categoriesDefault: Prisma.CategoryCreateManyUserInput[] = [
		{ name: 'Salário', type: CategoriesTypes.INCOME, icon: 'travel' },
		{ name: 'Freelance', type: CategoriesTypes.INCOME, icon: 'freelance' },
		{ name: 'Outro', type: CategoriesTypes.INCOME, icon: 'other' },

		{ name: 'Casa', type: CategoriesTypes.EXPENSE, icon: 'home' },
		{ name: 'Alimentação', type: CategoriesTypes.EXPENSE, icon: 'food' },
		{ name: 'Educação', type: CategoriesTypes.EXPENSE, icon: 'education' },
		{ name: 'Lazer', type: CategoriesTypes.EXPENSE, icon: 'fun' },
		{ name: 'Mercado', type: CategoriesTypes.EXPENSE, icon: 'grocery' },
		{ name: 'Roupas', type: CategoriesTypes.EXPENSE, icon: 'clothes' },
		{ name: 'Transporte', type: CategoriesTypes.EXPENSE, icon: 'transport' },
		{ name: 'Viagem', type: CategoriesTypes.EXPENSE, icon: 'travel' },
		{ name: 'Outro', type: CategoriesTypes.EXPENSE, icon: 'other' },
	];

	async create(createUserDto: CreateUserDto) {
		const { email, name, password } = createUserDto;

		const emailTaken = await this.userRepo.findByEmail({
			where: { email },
			select: { id: true },
		});

		if (emailTaken) {
			throw new ConflictException('This email is alredy in use');
		}

		const hashedPassword = await this.passwordHelper.crypt(password);

		const _user = await this.userRepo.create({
			data: {
				email,
				name,
				password: hashedPassword,
				categories: {
					createMany: {
						data: this._categoriesDefault,
					},
				},
			},
		});

		return _user;
	}
}
