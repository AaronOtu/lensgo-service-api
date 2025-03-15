import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userModel.find();

      return {
        message: 'Successfully returned all users',
        users: users,
      };
    } catch (error) {
      throw new ConflictException('Something went wrong');
    }
  }

  async getOneUser(id: string) {
    try {
      const Id = new Types.ObjectId(id);
      const user = await this.userModel.findById(Id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        message: 'Successfully return user',
        user: user,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const Id = new Types.ObjectId(id);
      const user = await this.userModel
        .findByIdAndUpdate(Id, updateUserDto, { new: true })
        .exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return {
        message: 'Successfully updated user profile',
        user: user,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }

  async removeUser(id: string) {
    try {
      const Id = new Types.ObjectId(id);
      const user = await this.userModel.findByIdAndDelete(Id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        message: 'Successfully removed user',
        user: user,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }
}
