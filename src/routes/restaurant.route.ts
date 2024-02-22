import express from 'express';
import { getNearbyRestaurants, getAllRestaurants, deleteRestaurantById} from '../controllers/restaurant.controllers';

const router = express.Router();

router.get('/get-nearby-restaurants', getNearbyRestaurants);
router.get('/get-all-restaurants', getAllRestaurants);
router.delete('/delete-restaurant/:id', deleteRestaurantById);

export default router;
