import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('api')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('admins')
  findAll() {
    console.log('Controller: findAll method called');
    return this.adminsService.getAdmins();
  }
 
  @Get('admins/:id')
  findOne(@Param('id') id: string) {
    return this.adminsService.getAdminProfile(id);
  }


  @Patch('admins/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateAdmin(id, updateAdminDto);
  }

  @Delete('admins/:id')
  remove(@Param('id') id: string) {
    return this.adminsService.removeAdmin(id);
  }
}
