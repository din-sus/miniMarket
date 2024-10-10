import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}
