import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id/parse-object-id.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  //private logger = new Logger(UsersService.name);
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    const results = await this.usersService.getAllUsers();

    return results;
  }

  @Get('/:id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getOneUser(id);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.removeUser(id);
  }
}
