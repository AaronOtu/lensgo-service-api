import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtisansService } from './artisans.service';
import { CreateArtisansDto } from './dto/create-artisans.dto';
import { UpdateArtisanDto } from './dto/update-artisans.dto';
@Controller('artisans')
export class ArtisansController {
  constructor(private readonly artisansService: ArtisansService) {}


  // @Post()
  // create(@Body() createArtisansDto: CreateArtisansDto) {
  //   return this.artisansService.create(createArtisansDto);
  // }

  @Get()
  findAll() {
    return this.artisansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artisansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtisanDto: UpdateArtisanDto) {
    return this.artisansService.update(id, updateArtisanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artisansService.remove(id);
  }
}
