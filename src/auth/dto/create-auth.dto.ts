import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'Aaron' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'Otu' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, default: 'aaronotu@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'password1234' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false, default: Role.ADMIN })
  role: string;
}

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'aaronotu@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'password1234' })
  password: string;


  @IsString()
  @IsNotEmpty()
  @IsIn(['USER', 'ADMIN', 'ARTISAN'])
  @ApiProperty({
    required: true,
    enum: ['USER', 'ADMIN', 'ARTISAN'],
    example: 'USER'
  })
  role: string;
}


export class ForgotPasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'vigilantkwao@gmail.com' })
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({required:true, default : 'iohh9ihciohvdihiuhgiuh9hidhgiehih9hiudheiwghiuehudhdhiugh'})
  token: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({required:true, default : 'password1234'})
  newPassword: string;
}


export class ChangePasswordDto {

  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({required:true, default: "nadine@gmail.com"})
  email: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty({required:true, default: "password1234"})
  oldPassword:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({required:true, default: "password1234"})
  newPassword:string;
}