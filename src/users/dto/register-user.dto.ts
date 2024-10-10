import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNotEmpty()
    @IsNumber()
    wasBorn: number

    @IsString()
    role: string
}
