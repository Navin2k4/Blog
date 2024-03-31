import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || email === '' || password === '' || username === '') {
        next(errorHandler(400, "All Fields Are Required"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = User(
        {
            username,
            email,
            password: hashedPassword,
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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({ email });
                const vaidPassword = await bcryptjs.compareSync(password, validUser.password);

        if (!validUser) {
            return next(errorHandler(404, "User Not found")); // Should use credentials incorrect
        }
        if (!vaidPassword) {
            return next(errorHandler(400, "Password Invaid")); // Should use credentials incorrect
        }
        // We should not gibe both differenty since knowing one of them may lead the leak of security information

        // Authentication usif json webtoken 
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password:pass, ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        })
        .json(rest);

    } catch (error) {
        next(error);
    }
};