import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
 @ApiProperty({example: `user@mail.com`})
 @IsEmail()
 email: string; 
 
 @ApiProperty({example: `123456`})
 @IsString()
 @MinLength(6)
 password:string
}