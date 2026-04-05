import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/resisterUser.dto';
import { SingInDto } from './dto/singIn.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post("register")
    async register(@Body() registerUserDto: RegisterDto) {

        const user_token = await this.authService.registerUser(registerUserDto);
        return user_token;
    }

    @Post('login')
    async login(@Body() signInDto: SingInDto) {

        const userData = await this.authService.singIn(signInDto.email, signInDto.password);
        return userData;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userId = req.user.sub
        const userData = await this.userService.findUserById(userId)
        return userData
    }
}      