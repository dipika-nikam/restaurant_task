import { Request, Response } from 'express';
import { IRestaurant } from '../interfaces/restaurant.interface';
import * as RestaurantQueryService from '../services/restaurant.service';

/**
 * Create Restaurant
 *
 * @body name, address, cuisineType, latitude, longitude
 *
 * @returns { Restaurant }
*/
export const createRestaurant = async (req: Request, res: Response) => {
  const { name, address, cuisineType, latitude, longitude } = req.body;
  try {
    const newRestaurant = await RestaurantQueryService.createRestaurantService(name, address, cuisineType, latitude, longitude);
    return res.status(201).json({
      status: 201,
      message: "Your restaurant is added",
      error: false,
      data: newRestaurant
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: true,
      data: []
    });
  }
};

/**
 * Get near by Restaurant
 *
 * @params latitude, longitude, radius
 *
 * @returns { Restaurant }
*/

export const getNearbyRestaurants = async (req: Request, res: Response) => {
  const { latitude, longitude, radius } = req.query as {
    latitude?: string;
    longitude?: string;
    radius?: string;
  };
  if (!latitude || !longitude || !radius) {
    return res.status(400).json({
      status: 400,
      message: "Latitude, longitude, and radius are required.",
      error: true,
      data: []
    });
  }

  const parsedLatitude = parseFloat(latitude);
  const parsedLongitude = parseFloat(longitude);
  const parsedRadius = Number(radius);

  if (isNaN(parsedLatitude) || isNaN(parsedLongitude) || isNaN(parsedRadius) || parsedRadius < 0) {
    return res.status(400).json({
      status: 400,
      message: "Invalid input. Latitude, longitude, and radius must be valid non-negative numbers.",
      error: true,
      data: []
    });
  }

  try {
    const restaurants = await RestaurantQueryService.findRestaurantsNearLocation(parsedLongitude, parsedLatitude, parsedRadius);
   
    if(restaurants.length === 0){
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        error: false,
        data: []
      });
    }
    const restaurantsname = restaurants.map((restaurant: IRestaurant) => {
      const { location, ...rest } = restaurant.toObject();
      return rest;
    });
    return res.status(200).json({
      status: 200,
      message: "These are the restaurants near you",
      error: false,
      data: restaurantsname
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: true,
      data: []
    });
  }
};

/**
 * List of all Restaurant
 *
 * @params {}
 *
 * @returns { Restaurant }
*/

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantQueryService.findAllRestaurants();
    if (restaurants.length === 0){
      return res.status(404).json({
        status: 404,
        message: "Data not found",
        error: false,
        data: []
      });
    }
    return res.status(200).json({
      status: 200,
      message: "List of restaurants",
      error: false,
      data: restaurants
    });
  } catch (error) {
    return res.status(500).json({
      status: 200,
      message: "Internal server error",
      error: true,
      data: []
    });
  }
};

/**
 * Delete Restaurant
 *
 * @params restaurant_id
 *
 * @returns { Restaurant }
*/

export const deleteRestaurantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRestaurant = await RestaurantQueryService.deleteRestaurantById(id);
    if (!deletedRestaurant) {
      return res.status(404).json({
        status: 404,
        message: "Requested Restaurant not found",
        error: false,
        data: []
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Restaurant deleted successfully",
      error: false,
      data: []
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: true,
      data: []
    });
  }
};
