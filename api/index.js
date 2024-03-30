import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';

dotenv.config();

// Creating Database Connection
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected");
    }).catch(err => {
        console.log(err);
    });

// Creating the app
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// Creating test API
app.use('/api/user', userRoutes);