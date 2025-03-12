import {
  IsNotEmpty,
  IsDateString,
  IsMongoId,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from 'src/enum/booking-status.enum';
import { ApiProperty } from '@nestjs/swagger';

class LocationDto {
  @IsNumber()
  @ApiProperty({ example: -0.127758 })
  longitude: number;

  @IsNumber()
  @ApiProperty({ example: 51.507351 })
  latitude: number;
}

export class CreateBookingDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: '65f22a0bc3a8a1b123456789' })
  user_id: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: '65f22a0bc3a8a1b987654321' })
  provider_id: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  @ApiProperty({ enum: BookingStatus, example: BookingStatus.PENDING })
  booking_status?: BookingStatus; // defaults to "PENDING"

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  @ApiProperty({
    type: LocationDto,
  })
  location: LocationDto;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2025-03-15T14:30:00.000Z',
  })
  scheduled_time: Date;
}
