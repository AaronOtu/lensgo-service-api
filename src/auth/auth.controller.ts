import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
} from './dto/create-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Might use it later
  /*
  @Post('/createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
  @Post('/createAdmin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.createAdmin(createAdminDto);
  }
  @Post('/createArtisans')
  createArtisans(@Body() createArtisansDto: CreateArtisansDto) {
    return this.authService.createArtisans(createArtisansDto);
  }
   */
  @Post('/create-profile')
  createPersonnel(@Body() createUserDto: CreateAuthDto) {
    return this.authService.createPersonnel(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginAuthDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Get('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return await this.authService.resetPassword(dto);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
