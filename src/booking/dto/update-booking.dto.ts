import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(
  OmitType(CreateBookingDto, ['provider_id'] as const),
) {}
