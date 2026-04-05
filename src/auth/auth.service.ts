import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/resisterUser.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) { }

    async registerUser(registerUserDto: RegisterDto) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password, saltRounds)
        // Logic for user register
        /**
         * 1. check if email already existes
         * 2. hash the passwrod
         * 3. store the user into db
         * 4. generate JWT token
         * 5. sent token in response
         */

        const user = await this.userService.createUser({ ...registerUserDto, password: hash, role: 'student' });

        // const payload = { sub: user._id, email: user.email, role: user.role };
        // const token = await this.jwtService.signAsync(payload)

        return user;
    }

    async singIn(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);

        const checkPassword = await bcrypt.compareSync(password, user.password);

        if (!checkPassword) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, email: user.email, role: user.role }
        const token = await this.jwtService.signAsync(payload)
        return { access_token: token };
    }

}
