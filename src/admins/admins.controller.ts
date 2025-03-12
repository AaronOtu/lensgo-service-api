import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('admins')
  findAll() {
    console.log('Controller: findAll method called');
    return this.adminsService.getAdmins();
  }
 
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.adminsService.getAdminProfile(id);
  }


  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateAdmin(id, updateAdminDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.adminsService.removeAdmin(id);
  }
}
