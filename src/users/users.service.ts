import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectModel(User.name) private userModel:Model<User>) {}
 
  async getAllUsers() {
    try {

      console.log("Fetch begin");

      const users = await this.userModel.find();
      console.log("Fetched users", users) 

      return {
        message: 'Successfully returned all users',
        users: users
      }
    }
    catch (error) {
      throw new ConflictException('Something went wrong')
    }
  }


  async getOneUser(id: string) {
    try{
      const user = await this.userModel.findById(id).exec();
      if(!user){
        throw new NotFoundException("User not found")
      }
      return {
        message: "Successfully return user",
        user: user
      };
    }catch(error){
      this.logger.log(error.message)
     throw error
    }
  }

 
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto,{new:true}).exec();
      if(!user){
        throw new NotFoundException('User not found')
      }
      return{
        message: 'Successfully updated user profile',
        user:user
      }
      
    } catch (error) {
      this.logger.log(error.message)
      throw error
      
    }

  }
 

  async removeUser(id: string) {
    try{
      const user = await this.userModel.findByIdAndDelete(id).exec();
      if(!user){
        throw new NotFoundException('User not found')
      }

      return {
        message: "Successfully removed user",
        user:user
      };
    }catch(error){
     this.logger.log(error.message)
     throw error
    }
  }
}
