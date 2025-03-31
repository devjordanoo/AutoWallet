import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignupDto } from './dto/signup.dto';
import { PasswordHelper } from 'src/utils/helpers/password.helper';
import { UsersRepositories } from 'src/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CategoriesTypes } from 'src/utils/enums/categoriesTypes.enum';

@Injectable()
export class AuthService {
	constructor(
		private readonly passwordHelper: PasswordHelper,
		private readonly userRepo: UsersRepositories,
		private readonly jwtService: JwtService,
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
	async authenticate(authenticateDto: AuthenticateDto) {
		const { email, password } = authenticateDto;
		const _user = await this.userRepo.findUnique({
			where: { email },
		});

		if (!_user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isPasswordValid = await this.passwordHelper.compare(
			password,
			_user.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const accessToken = await this.generateAccessToken(_user.id);

		return { accessToken };
	}

	async signup(signupDto: SignupDto) {
		const { email, name, password } = signupDto;

		const emailTaken = await this.userRepo.findUnique({
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

		const accessToken = await this.generateAccessToken(_user.id);

		return { accessToken };
	}

	private async generateAccessToken(userId: string) {
		return await this.jwtService.signAsync({ userId });
	}
}
