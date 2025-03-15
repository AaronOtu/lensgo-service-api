import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEmail } from "class-validator"
import { Role } from "src/enum/role.enum"

export class CreateArtisansDto {
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
      @ApiProperty({required:false, default:Role.ARTISAN})
      role: string
}
