import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id/parse-object-id.pipe';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('')
  findAll() {
    console.log('Controller: findAll method called');
    return this.adminsService.getAdmins();
  }

  @Get('/:id')
  findOne(@Param('id',ParseObjectIdPipe) id: string) {
    return this.adminsService.getAdminProfile(id);
  }

  @Patch('/:id')
  update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.updateAdmin(id, updateAdminDto);
  }

  @Delete('/:id')
  remove(@Param('id',ParseObjectIdPipe) id: string) {
    return this.adminsService.removeAdmin(id);
  }
}
