import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { SignupDto } from './dto/signup.dto';
import { IsPublic } from 'src/utils/decorators/isPublic';

@IsPublic()
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	async authenticate(@Body() authenticateDto: AuthenticateDto) {
		return await this.authService.authenticate(authenticateDto);
	}

	@Post('signup')
	create(@Body() signupDto: SignupDto) {
		return this.authService.signup(signupDto);
	}
}
