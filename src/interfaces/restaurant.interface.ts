import { Document } from "mongoose";

export interface IRestaurant extends Document {
    name: string;
    address: string;
    cuisineType: string;
    location: {
      type: { type: string };
      coordinates: number[];
    };
}