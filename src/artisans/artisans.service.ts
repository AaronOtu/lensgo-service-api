import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateArtisansDto } from './dto/create-artisans.dto';
import { UpdateArtisanDto } from './dto/update-artisans.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artisans } from './schemas/artisans.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ArtisansService {
  private readonly logger = new Logger(ArtisansService.name);
  constructor(@InjectModel(Artisans.name) private readonly artisansModel: Model<Artisans>) { }




  async findAll() {
    try {

      const artisans = await this.artisansModel.find();

      return {
        message: 'Successfully returned all artisans',
        artisans: artisans
      };
    } catch (error) {
      this.logger.log(error.message)
      throw error
    }
  }

  async findOne(id: string) {

    try {
      const artisan = await this.artisansModel.findById(id);
      if (!artisan) {
        this.logger.log(`Artisan with id ${id} not found`);
        throw new NotFoundException(`Artisan with id ${id} not found`);
      }
      return {
        message: `Successfully returned artisan `,
        artisan: artisan
      };
    } catch (error) {
      this.logger.log(error.message)
      throw error
    }

  }


async update(id: string, updateArtisanDto: UpdateArtisanDto) {
  try {
    const updatedArtisan = await this.artisansModel.findByIdAndUpdate(id, updateArtisanDto, { new: true });
    if (!updatedArtisan) {
      this.logger.log(`Artisan with id ${id} not found`);
      throw new NotFoundException(`Artisan with id ${id} not found`);
    }
    return {
      message: `Successfully updated artisan with id ${id}`,
      artisan: updatedArtisan
    };
  } catch (error) {
    this.logger.log(error.message)
    throw error
  }
}

  async remove(id: string) {
  try {
    const removedArtisan = await this.artisansModel.findByIdAndDelete(id);
    if (!removedArtisan) {
      this.logger.log(`Artisan with id ${id} not found`);
      throw new NotFoundException(`Artisan with id ${id} not found`);
    }
    return {
      message: `Successfully removed artisan with id ${id}`,
     
    };
  } catch (error) {
    this.logger.log(error.message)
    throw error
  }
}
}
