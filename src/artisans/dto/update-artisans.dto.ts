
import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateArtisansDto } from './create-artisans.dto';

export class UpdateArtisanDto extends PartialType(
    OmitType(CreateArtisansDto, ['role', 'password'] as const)
) {}
