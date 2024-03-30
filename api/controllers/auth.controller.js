import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req,res,next) => {
    const {username,email,password} = req.body;

    if(
        !username ||
        !email || 
        !password || 
        email === '' || 
        password === '' || 
        username=== '')
        {
            next(errorHandler(400,"All Fields Are Required"));
        }
    
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = User(
        {
            username,
            email,
            password:hashedPassword,
        }
    )

    try {
        // Saving the new user to the database
        await newUser.save();
        res.json('User saved successfully');
    } catch (error) {
        next(error);
    }


};