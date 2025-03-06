import { PartialType } from '@nestjs/mapped-types';
import { CreateArtisansDto } from './create-artisans.dto';

export class UpdateArtisanDto extends PartialType(CreateArtisansDto) {}
