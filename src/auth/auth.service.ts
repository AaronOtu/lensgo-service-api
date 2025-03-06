import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schemas';
import { Admin} from 'src/admins/schemas/admin.schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { Artisans } from 'src/artisans/schemas/artisans.schemas';
import { CreateArtisansDto } from 'src/artisans/dto/create-artisans.dto';



@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private
  constructor(
    @InjectModel(User.name) private readonly userModel:Model<User>, 
    @InjectModel(Admin.name) private readonly adminModel:Model<Admin>, 
    @InjectModel(Artisans.name) private readonly artisansModel:Model<Artisans>,
    private readonly jwtService: JwtService) {}

  async createUser(createUserDto: CreateUserDto) {
    try{
      const users = await this.userModel.findOne({email: createUserDto.email})
      if(users){
        throw new ConflictException('User already exist')
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password,10)
      const newUser = new this.userModel(
        {
          ...createUserDto,
          password:hashedPassword
        }
      )
      this.logger.log(newUser)
      await newUser.save();

      return {
        message: "User successfully created",
        user: newUser
      }
      
    }catch(error){
      this.logger.log(error)
      throw error
    }
  
  }
  async createAdmin(createAdminDto: CreateAdminDto) {
    try{
      const admins = await this.adminModel.findOne({email: createAdminDto.email})
      if(admins){
        throw new ConflictException('Admin already exist')
      }

      const hashedPassword = await bcrypt.hash(createAdminDto.password,10)
      const newUser = new this.adminModel(
        {
          ...createAdminDto,
          password:hashedPassword
        }
      )
      this.logger.log(newUser)
      await newUser.save();

      return {
        message: "Admin successfully created",
        admin: newUser
      }
      
    }catch(error){
      this.logger.log(error)
      throw error
    }
  
  }
  async createArtisans(createArtisansDto: CreateArtisansDto) {
    try{
      const admins = await this.artisansModel.findOne({email: createArtisansDto.email})
      if(admins){
        throw new ConflictException('Artisans already exist')
      }

      const hashedPassword = await bcrypt.hash(createArtisansDto.password,10)
      const newUser = new this.artisansModel(
        {
          ...createArtisansDto,
          password:hashedPassword
        }
      )
      this.logger.log(newUser)
      await newUser.save();

      return {
        message: "Artisans successfully created",
        admin: newUser
      }
      
    }catch(error){
      this.logger.log(error)
      throw error
    }
  
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
