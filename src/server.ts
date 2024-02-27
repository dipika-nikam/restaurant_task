import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurant.route';
import userRoutes from './routes/user.route'

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

mongoose.connect(MONGODB_URI, {
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
