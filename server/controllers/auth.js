import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


// post register  
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const saveUser = await newUser.save();
        res.status(201).json({
            success: true,
            saveUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

// login in

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).lean().exec();
        if (!user) return res.status(400).json({ success: false, message: "Users does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({
            success: true,
            token,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message
        })
    }
}