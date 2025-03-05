import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schemas';
import { Model } from 'mongoose';

@Injectable()
export class AdminsService {
  private logger = new Logger(AdminsService.name);
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>){}

  async getAdmins(){
    try {
      console.log('Hitting the admin endpoint')
      const admins = await this.adminModel.find().exec();

      return{
        message: "Retriving all admins",
        admins:admins
      }
    } catch (error) {
      this.logger.log(error.message)
      throw error
    }
  }
 
  async getAdminProfile(id) {

    try {
      console.log('Getting admin profile')
      const admins = await this.adminModel.findById(id).exec();

      if (!admins) {
        throw new NotFoundException('Admin not found')
      }
      return {
        message: "Successfully retrieved admin profile",
        admin: admins
      };
    } catch (error) {
      this.logger.log(error)
      throw new ConflictException(error.message || 'Something went wrong')
    }
  }



  async updateAdmin(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();

      if (!admin) {
        throw new NotFoundException('Admin not found')
      }
      return {
        message: 'Succefully updated admin profile',
        admin: admin
      }
    } catch (error) {
      this.logger.log(error)
      throw error
    }
  }
 
  async removeAdmin(id: string) {
    try {
      await this.adminModel.findByIdAndDelete(id)
      return {
        message: `Successfully deleted admin`
      }
    } catch (error) {
      this.logger.log(error.message)
      throw new ConflictException('Something went wrong')
    }
  }


}
