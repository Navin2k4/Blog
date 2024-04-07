import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

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

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// Creating test API
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});