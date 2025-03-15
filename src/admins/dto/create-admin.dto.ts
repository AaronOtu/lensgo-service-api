import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Role } from "src/enum/role.enum"


export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true, default:'Aaron'})
  firstName: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({required: true, default:'Otu'})
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({required:true, default:'aaronotu@gmail.com'})
  email: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true, default:'password1234'})
  password: string


  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:false, default:Role.ADMIN})
  role: string
}


export class LoginAdminDto{

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