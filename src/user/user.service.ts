import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './../auth/dto/resisterUser.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel) { }

    async createUser(registerUserDto: RegisterDto) {
        try {
            return await this.userModel.create(registerUserDto)
        } catch (error) {
            const keys = Object.keys(error.keyValue);
            const DUPLICATE_KEY_CODE = 11000
            if (error.code === DUPLICATE_KEY_CODE) {
                const field = keys.map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(", ");

                throw new ConflictException(`${field} already is already taken`)
            }
            throw error;
        }
    }

    async findUserByEmail(email: string) {
        try {
            return await this.userModel.findOne({ email })
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findUserById(id: string) {
        try {
            return await this.userModel.findOne({ _id: id }).select("-password")
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
