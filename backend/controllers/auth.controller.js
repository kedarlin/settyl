import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (
        !userName ||
        !email ||
        !password ||
        userName.trim() === '' ||
        email.trim() === '' ||
        password.trim() === ''
    ) {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate email error
            return next(errorHandler(409, 'Email already exists'));
        }
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        // Create JWT token with user ID
        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expiration time
        });

        // Send token and user ID in the response
        res.status(200).json({ token, userId: validUser._id, userName: validUser.userName });
    } catch (error) {
        next(error);
    }
};