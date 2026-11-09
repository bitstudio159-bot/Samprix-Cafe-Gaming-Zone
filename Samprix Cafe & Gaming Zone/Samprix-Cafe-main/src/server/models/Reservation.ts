import mongoose, { Schema } from 'mongoose';
import type { Reservation } from '../../types';

const ReservationSchema = new Schema<Reservation>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },

    reservationNumber: {
      type: String,
      required: true,
      unique: true
    },

    customerName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    guests: {
      type: Number,
      required: true,
      min: 1
    },

    zone: {
      type: String,
      enum: [
        'esports_arena',
        'ps5_battlestation',
        'cafe_lounge',
        'vip_booth',
        'hookah_cloud_deck'
      ],
      required: true
    },

    gamingHours: {
      type: Number,
      min: 0
    },

    specialRequests: String,

    status: {
      type: String,
      enum: [
        'confirmed',
        'pending',
        'seated',
        'completed',
        'cancelled'
      ],
      default: 'pending'
    },

    createdAt: {
      type: String,
      required: true
    }
  },
  {
    collection: 'reservations',
    versionKey: false
  }
);

export const ReservationModel =
  mongoose.models.Reservation ||
  mongoose.model<Reservation>(
    'Reservation',
    ReservationSchema
  );