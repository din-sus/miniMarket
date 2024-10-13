import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    author: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsBoolean()
    @IsNotEmpty()
    inStock: boolean

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    category: string

}
