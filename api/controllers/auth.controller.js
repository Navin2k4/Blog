import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req,res) => {
    const {username,email,password} = req.body;

    if(
        !username ||
        !email || 
        !password || 
        email === '' || 
        password === '' || 
        username=== '')
        {
        return res.status(400).json({message:'All fields are required'});
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
        res.status(500).json({message: error.message});
    }


};