import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id/parse-object-id.pipe';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Types } from 'mongoose';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get()
  allBookings() {
    return this.bookingService.allBookings();
  }

  @Get(':id')
  getBooking(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.bookingService.getBooking(id);
  }

  @Patch(':id')
  updateBooking(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.bookingService.deleteBooking(id);
  }
}
