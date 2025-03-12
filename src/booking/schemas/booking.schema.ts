import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BookingStatus } from 'src/enum/booking-status.enum';

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Artisans', required: true })
  provider_id: Types.ObjectId;

  @Prop({ type: String, enum: BookingStatus, default: BookingStatus.PENDING })
  booking_status: BookingStatus;

  @Prop({
    type: { longitude: Number, latitude: Number },
    index: '2dsphere',
    required: true,
  })
  location: { longitude: number; latitude: number };

  @Prop({ type: Date, required: true })
  scheduled_time: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
