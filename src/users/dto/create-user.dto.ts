import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true, default:'Aaron'})
  firstname: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true, default:'Otu'})
  lastname: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({required:true, default:'aaronotu@gmail.com'})
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true, default:'password1234'})
  password: string


}

export class LoginEmployeeDto{

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({required:true, default: 'aaronotu@gmail.com'})
  email:string


  @IsString()
  @IsNotEmpty()
  @ApiProperty({required:true, default: 'password1234'})
  password:string


}