import { IsEmail, IsNotEmpty } from 'class-validator';


export class SingInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}