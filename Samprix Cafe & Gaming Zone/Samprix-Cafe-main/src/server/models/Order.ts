import mongoose, { Schema } from 'mongoose';
import type { Order } from '../../types';

const OrderSchema = new Schema<Order>(
  {
    id: { type: String, required: true, unique: true },
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    deliveryType: {
      type: String,
      enum: ['dine-in', 'takeaway', 'delivery'],
      required: true
    },

    tableNumber: String,
    deliveryAddress: String,
    notes: String,

    items: { type: [Schema.Types.Mixed], required: true } as any,

    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ['esewa', 'khalti', 'card', 'cash'],
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ['paid', 'pending'],
      default: 'pending'
    },

    status: {
      type: String,
      enum: [
        'received',
        'preparing',
        'in_oven_grill',
        'ready',
        'out_for_delivery',
        'completed',
        'cancelled'
      ],
      default: 'received'
    },

    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },

    timeline: { type: [Schema.Types.Mixed], default: [] } as any
  },
  {
    collection: 'orders',
    versionKey: false
  }
);

export const OrderModel =
  mongoose.models.Order ||
  mongoose.model<Order>('Order', OrderSchema);