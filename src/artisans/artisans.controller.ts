import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtisansService } from './artisans.service';
import { UpdateArtisanDto } from './dto/update-artisans.dto';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id/parse-object-id.pipe';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth('access-token')
@Controller('artisans')
export class ArtisansController {
  constructor(private readonly artisansService: ArtisansService) {}

  @Get()
  findAll() {
    return this.artisansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.artisansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseObjectIdPipe) id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisansService.update(id, updateArtisanDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseObjectIdPipe) id: string) {
    return this.artisansService.remove(id);
  }
}
