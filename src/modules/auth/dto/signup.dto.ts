import {
	IsNotEmpty,
	IsString,
	MinLength,
	IsEmail,
	IsStrongPassword,
} from 'class-validator';

export class SignupDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty()
	@IsStrongPassword()
	@MinLength(8)
	password: string;
}
