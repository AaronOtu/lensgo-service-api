import { Module } from '@nestjs/common';
import { ArtisansService } from './artisans.service';
import { ArtisansController } from './artisans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artisans, ArtisanSchema } from './schemas/artisans.schemas';

@Module({
  imports:[
      MongooseModule.forFeature([{name:Artisans.name, schema:ArtisanSchema}])
    ],
  controllers: [ArtisansController],
  providers: [ArtisansService],
  exports: [MongooseModule]
})
export class ArtisansModule {}
