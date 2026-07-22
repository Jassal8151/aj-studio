import mongoose from 'mongoose';

export const CATEGORIES = [
  'Wedding',
  'Portrait',
  'Wildlife',
  'Nature',
  'Travel',
  'Fashion',
  'Product',
  'Event',
  'Street',
];

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Portfolio item title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: CATEGORIES,
        message: '{VALUE} is not a valid portfolio category',
      },
    },
    location: {
      type: String,
      trim: true,
      default: 'Studio Location',
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    camera: {
      type: String,
      trim: true,
      default: 'Canon EOS R5',
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, 'Cloudinary Public ID is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

portfolioSchema.index({ category: 1, createdAt: -1 });
portfolioSchema.index({ title: 'text', description: 'text' });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
