import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const sizePricesSchema = new Schema(
  {
    small: Number,
    medium: Number,
    large: Number,
    comboSmall: Number,
    comboMedium: Number,
    comboLarge: Number,
    normal: Number,
    cloud: Number,
  },
  { _id: false }
);

const menuItemSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    categoryName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    sizePrices: { type: sizePricesSchema, default: undefined },
    description: { type: String, required: true },
    image: String,
    isVegetarian: Boolean,
    isSpicy: Boolean,
    isPopular: Boolean,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewCount: { type: Number, required: true, min: 0 },
    preparationTimeMinutes: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    collection: 'menu_items',
  }
);

export type MenuItemDocument = InferSchemaType<typeof menuItemSchema>;

export const MenuItemModel =
  mongoose.models.MenuItem ||
  mongoose.model('MenuItem', menuItemSchema);