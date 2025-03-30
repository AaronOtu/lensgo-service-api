import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './schemas/booking.schema';
import { User } from 'src/users/schemas/user.schemas';
import { Artisans } from 'src/artisans/schemas/artisans.schemas';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Artisans.name) private readonly artisansModel: Model<Artisans>,
  ) {}
  async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<{ message: string }> {
    try {
      const providerCheck = await this.artisansModel.findById(
        createBookingDto.provider_id,
      );
      if (providerCheck) {
        //The DTO would be destructed to provide the user Id from the system
        const booking = await this.bookingModel.create(createBookingDto);

        this.logger.log(
          `Booking created successfully for user: ${booking.user_id}, ID: ${booking._id}`,
        );

        return {
          message: 'Service booked successfully',
        };
      } else {
        this.logger.log(
          `Provider with ID: ${createBookingDto.provider_id} not found`,
        );

        throw new NotFoundException('Provider not found');
      }
    } catch (error) {
      this.logger.error(
        `Failed to create booking: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async allBookings(): Promise<Booking[]> {
    try {
      const bookings = await this.bookingModel.find().exec();
      this.logger.log(`Retrieved ${bookings.length} bookings.`);
      return bookings;
    } catch (error) {
      this.logger.error(
        `Error retrieving all bookings: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async getBooking(id: string): Promise<Booking> {
    try {
      const booking = await this.bookingModel.findById(id).exec();
      if (!booking) {
        this.logger.warn(`Booking with ID ${id} not found.`);
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }
      this.logger.log(`Retrieved booking with ID ${id}.`);
      return booking;
    } catch (error) {
      this.logger.error(
        `Error retrieving booking with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async updateBooking(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<{ message: string }> {
    try {
      const updatedBooking = await this.bookingModel
        .findByIdAndUpdate(id, updateBookingDto, { new: true })
        .exec();

      if (!updatedBooking) {
        this.logger.warn(`Booking with ID ${id} not found for update.`);
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }

      this.logger.log(`Updated booking with ID ${id}.`);
      return {
        message: `Updated booking with ID ${id}.`,
      };
    } catch (error) {
      this.logger.error(
        `Error updating booking with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async deleteBooking(id: string): Promise<{ message: string }> {
    try {
      const deletedBooking = await this.bookingModel.findByIdAndDelete(id);

      if (!deletedBooking) {
        this.logger.warn(`Booking with ID ${id} not found`);
        throw new NotFoundException(`Booking with ID ${id} not found`);
      }

      this.logger.log(`Booking with ID ${id} deleted successfully`);
      return { message: `Booking with ID ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(
        `Failed to delete booking: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
