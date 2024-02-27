import express from 'express';
import { 
    getNearbyRestaurants, 
    getAllRestaurants, 
    deleteRestaurantById, 
    createRestaurant
} from '../controllers/restaurant.controllers';

import { authenticateToken } from '../middleware/auth.middleware'

const router = express.Router();

router.post('/create-restaurants', authenticateToken, createRestaurant)
router.get('/get-nearby-restaurants',authenticateToken, getNearbyRestaurants);
router.get('/get-all-restaurants',authenticateToken, getAllRestaurants);
router.delete('/delete-restaurant/:id',authenticateToken, deleteRestaurantById);

export default router;
