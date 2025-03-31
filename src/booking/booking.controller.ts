import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id/parse-object-id.pipe';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(req.user.id, createBookingDto);
  }

  @Get()
  allBookings() {
    return this.bookingService.allBookings();
  }

  @Get(':id')
  getBooking(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingService.getBooking(id);
  }

  @Patch(':id')
  updateBooking(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseObjectIdPipe) id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
