import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  //private logger = new Logger(UsersService.name);
  constructor(private readonly usersService: UsersService) { }



  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  async getAllUsers() {
    console.log('Hitting the endpoint')
    const results = await this.usersService.getAllUsers();
    console.log("Response", results);
    return results
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOneUser(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
