import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';


export class RegisterDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string

    @IsEnum(["admin", "student"])
    role: string;
}