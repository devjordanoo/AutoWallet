import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AuthenticateDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty()
	password: string;
}
