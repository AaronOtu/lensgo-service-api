import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { UsersModule } from 'src/users/users.module';
import { ArtisansModule } from 'src/artisans/artisans.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    UsersModule,
    ArtisansModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
