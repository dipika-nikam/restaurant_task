import Restaurant from '../models/restaurant.model';
import { IRestaurant } from '../interfaces/restaurant.interface';

/**
 * Create Restaurant
 *
 * @body name, address, cuisineType, latitude, longitude
 *
 * @returns { Restaurant }
*/
export const createRestaurantService = async (name: string, address: string, cuisineType: string, latitude: string, longitude: string) => {
    try {
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
            throw new Error("Latitude and longitude must be valid numbers.");
        }

        const newRestaurant = await Restaurant.create({
            name,
            address,
            cuisineType,
            location: {
                type: "Point",
                coordinates: [parsedLongitude, parsedLatitude],
            },
        });

        return newRestaurant;
    } catch (error) {
        throw new Error("Could not create restaurant");
    }
};


/**
 * Find Restaurants Near Location
 *
 * @params longitude, latitude, radius
 *
 * @returns { Promise<IRestaurant[]> }
*/
export const findRestaurantsNearLocation = async (longitude: number, latitude: number, radius: number): Promise<IRestaurant[]> => {
    return await Restaurant.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: radius
            }
        }
    });
};

/**
 * Find All Restaurants
 *
 * @params {}
 *
 * @returns { Promise<IRestaurant[]> }
*/
export const findAllRestaurants = async (): Promise<IRestaurant[]> => {
    return await Restaurant.find();
};

/**
 * Delete Restaurant By ID
 *
 * @params id
 *
 * @returns { Promise<IRestaurant | null> }
*/

export const deleteRestaurantById = async (id: string): Promise<IRestaurant | null> => {
    return await Restaurant.findByIdAndDelete(id);
};
