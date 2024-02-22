import mongoose, { Document } from 'mongoose';
import {IRestaurant} from '../interfaces/restaurant.interface'


const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    cuisineType: { type: String, required: true },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
});
  
restaurantSchema.index({ location: '2dsphere' });
export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
