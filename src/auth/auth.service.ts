import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  CreateAuthDto,
  ForgotPasswordDto,
  LoginAuthDto,
  ResetPasswordDto,
} from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schemas';
import { Admin } from 'src/admins/schemas/admin.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { Artisans } from 'src/artisans/schemas/artisans.schemas';
import { CreateArtisansDto } from 'src/artisans/dto/create-artisans.dto';
import { Request, Response } from 'express';
import { MailService } from 'src/services/https.services';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    @InjectModel(Artisans.name) private readonly artisansModel: Model<Artisans>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const users = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (users) {
        throw new ConflictException('User already exist');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      this.logger.log(newUser);
      await newUser.save();

      return {
        message: 'User successfully created',
        user: newUser,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }
  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const admins = await this.adminModel.findOne({
        email: createAdminDto.email,
      });
      if (admins) {
        throw new ConflictException('Admin already exist');
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
      const newUser = new this.adminModel({
        ...createAdminDto,
        password: hashedPassword,
      });
      this.logger.log(newUser);
      await newUser.save();

      return {
        message: 'Admin successfully created',
        admin: newUser,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async createArtisans(createArtisansDto: CreateArtisansDto) {
    try {
      const admins = await this.artisansModel.findOne({
        email: createArtisansDto.email,
      });
      if (admins) {
        throw new ConflictException('Artisans already exist');
      }

      const hashedPassword = await bcrypt.hash(createArtisansDto.password, 10);
      const newUser = new this.artisansModel({
        ...createArtisansDto,
        password: hashedPassword,
      });
      this.logger.log(newUser);
      await newUser.save();

      return {
        message: 'Artisans successfully created',
        admin: newUser,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async createPersonnel(createUserDto: CreateAuthDto) {
    try {
      const { email, role } = createUserDto;
      const existingUser = await this.userModel
        .findOne({ email })
        .select('-password');
      const existingAdmin = await this.adminModel
        .findOne({ email })
        .select('-password');
      const existingArtisan = await this.artisansModel
        .findOne({ email })
        .select('-password');

      if (existingUser || existingAdmin || existingArtisan) {
        throw new ConflictException('User already exist');
      }

      let newUser;
      switch (role) {
        case 'USER': {
          const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
          newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
          });
          break;
        }
        case 'ADMIN': {
          const hashedAdminPassword = await bcrypt.hash(
            createUserDto.password,
            10,
          );
          newUser = new this.adminModel({
            ...createUserDto,
            password: hashedAdminPassword,
          });
          break;
        }
        case 'ARTISAN': {
          const hashedArtisanPassword = await bcrypt.hash(
            createUserDto.password,
            10,
          );
          newUser = new this.artisansModel({
            ...createUserDto,
            password: hashedArtisanPassword,
          });
          break;
        }
        default:
          throw new ConflictException('Invalid user role');
      }

      await newUser.save();

      return {
        message: `User successfully created as ${role}`,
        user: newUser,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async login(loginDto: LoginAuthDto, @Res() res: Response) {
    try {
      if (!loginDto.email || !loginDto.password || !loginDto.role) {
        throw new BadRequestException('Email, password and role are required');
      }

      let userData;
      let modelName;

      switch (loginDto.role) {
        case 'USER':
          userData = await this.userModel
            .findOne({ email: loginDto.email })
            .lean();
          modelName = 'User';
          break;
        case 'ADMIN':
          userData = await this.adminModel
            .findOne({ email: loginDto.email })
            .lean();
          modelName = 'Admin';
          break;
        case 'ARTISAN':
          userData = await this.artisansModel
            .findOne({ email: loginDto.email })
            .lean();
          modelName = 'Artisan';
          break;
        default:
          throw new BadRequestException('Invalid role specified');
      }

      if (!userData) {
        throw new NotFoundException(`${modelName} not found with this email`);
      }

      const isMatch = await bcrypt.compare(
        loginDto.password,
        userData.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        id: userData._id,
        email: userData.email,
        role: loginDto.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      this.logger.log(
        `${loginDto.role} logged in: ${userData.firstName || 'N/A'} ${userData.lastName || 'N/A'} with ${userData.email}`,
      );

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        profile: {
          id: userData._id,
          firstName: userData.firstName || 'N/A',
          lastName: userData.lastName || 'N/A',
          email: userData.email,
          role: loginDto.role,
        },
        accessToken,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken);
      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new access token
      const newAccessToken = this.jwtService.sign({
        id: payload.id,
        email: payload.email,
        role: payload.role,
      });
     this.logger.log(`Token refreshed for ${payload.email} with role ${payload.role}`);
      return res.json({
        success: true,
        message: 'Token refreshed successfully',
        email: payload.email,
        role: payload.role,
        accessToken: newAccessToken,
      });
    } catch (error) {
      this.logger.log(error);
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }

  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token');
    return res.json({
      success: true,
      message: 'Logout successful',
    });
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const user =
        (await this.adminModel.findOne({ email: dto.email })) ||
        (await this.userModel.findOne({ email: dto.email })) ||
        (await this.artisansModel.findOne({ email: dto.email }));
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
      //const link = `Reset password link: ${process.env.FRONTEND_URL}/reset-password/${token}`;
      const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await this.mailService.sendMail({
        to: user.email,
        from: process.env.MAIL_USER,
        subject: 'Reset Password',
        body: link,
      });
      this.logger.log(`Password reset link sent to ${user.email}`);
      this.logger.log(link);

      return {
        success: true,
        message: `Password reset link sent to ${user.email}`,
      };
    } catch (error) {
      this.logger.error(`Forgot Password Error: ${error.message}`, error.stack);
      throw error;
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    try {
      const payload = this.jwtService.verify(dto.token);
      const user =
        (await this.adminModel.findById(payload.id)) ||
        (await this.artisansModel.findById(payload.id)) ||
        (await this.userModel.findById(payload.id));

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.password = await bcrypt.hash(dto.newPassword, 10);
      await user.save();

      this.logger.log(
        `Password has been reset successfully for ${user.email} `,
      );

      return {
        success: true,
        message: `Password has been reset successfully for ${user.email}`,
      };
    } catch (error) {
      this.logger.error(`Reset Password Error: ${error.message}`, error.stack);
      throw error;
    }
  }

  async changePassword(dto: ChangePasswordDto) {
    try {
      const user =
        (await this.adminModel.findOne({ email: dto.email })) ||
        (await this.userModel.findOne({ email: dto.email })) ||
        (await this.artisansModel.findOne({ email: dto.email }));

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        dto.oldPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid old password');
      }

      const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
      this.logger.log(
        `Password has been changed successfully for ${user.email}`,
      );

      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (e) {
      this.logger.error(`Error :=> ${e}`);
      throw e;
    }
  }
}
