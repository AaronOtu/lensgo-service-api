import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schemas';
import { Model, Types } from 'mongoose';

@Injectable()
export class AdminsService {
  private readonly logger = new Logger(AdminsService.name);
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async getAdmins() {
    try {
      console.log('Hitting the admin endpoint');
      const admins = await this.adminModel.find().exec();

      return {
        message: 'Retrieving all admins',
        admins: admins,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw error;
    }
  }

  async getAdminProfile(id: string) {
    try {
      const Id = new Types.ObjectId(id);
      const admins = await this.adminModel.findById(Id).exec();

      if (!admins) {
        throw new NotFoundException('Admin not found');
      }
      return {
        message: 'Successfully retrieved admin profile',
        admin: admins,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
   
    }
  }

  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const Id = new Types.ObjectId(id);
      const admin = await this.adminModel
        .findByIdAndUpdate(Id, updateAdminDto, { new: true })
        .exec();

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      return {
        message: 'Successfully updated admin profile',
        admin: admin,
      };
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async removeAdmin(id: string) {
    try {
      const Id = new Types.ObjectId(id);
      const removedAdmin = await this.adminModel.findByIdAndDelete(Id);
      if (!removedAdmin) {
        this.logger.log(`Admin with id ${id} not found`);
        throw new NotFoundException('Admin not found');
      }
      return {
        message: `Successfully deleted admin`,
      };
    } catch (error) {
      this.logger.log(error.message);
      throw new ConflictException('Something went wrong');
    }
  }
}
